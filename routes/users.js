var express = require("express");
var router = express.Router();
const { equipementModel } = require("../dbSchema");
const { RAZORPAY_API_KEY, RAZORPAY_API_SECRET } = require("../dbConfig");
const {
  hashpassword,
  hashcompare,
  createToken,
  validate,
  validatetoken,
  roleAdmin,
} = require("../auth");
const {
  equipementModel2,
  orderModel,
  checkoutModel,
} = require("../dbproductschema");
const generator = require("./createUniqueRandomId").createUniqueRandomId;
const { differenceInDays } = require("date-fns");
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/signup", async (req, res) => {
  try {
    let emailuser = await equipementModel.find({ email: req.body.email });
    if (emailuser.length) {
      res.send({
        statusCode: 400,
        message: "User Already exists",
      });
    } else {
      let value = 0;
      console.log("reached else part");
      let hashedpassword = await hashpassword(req.body.password);
      req.body.password = hashedpassword;
      let email = req.body.email;
      if (email.includes("admin")) {
        console.log("successfully navigated to admin");
        value= await createUser(0, 100); // Pass min and max values for admin
      } 
      else {
        console.log("successfully navigated to other");
        value= await createUser(101, 1000); // Pass min and max values for normalUser
      }
      console.log("Random ID:", value);
      let newusers = await equipementModel.create({
        role: email.includes("admin") ? "admin" : "normalUser",
        roleID: value,
        ...req.body,
      });
      res.send({
        statusCode: 200,
        message: "Sign Up Successful",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});
async function createUser(min, max) {
  const modelName2 = equipementModel;
  const feildName2 = "roleID";
  let randomvalue = await generator(min, max, modelName2, feildName2);
  console.log('Random ID:', randomvalue);
  return randomvalue
  // Use the value for further operations
}

router.post("/login", async (req, res) => {
  try {
    // console.log(req.body)
    let emailuser = await equipementModel.find({ email: req.body.email });  
    console.log(emailuser.roleID)
    let id=emailuser[0].roleID
    console.log(id)
    if (emailuser.length) {
      let hash = await hashcompare(req.body.password, emailuser[0].password);
      if (hash) {
        let token = await createToken(emailuser[0].email, emailuser[0].role);
        res.send({
          statusCode: 200,
          message: "Login Succesfull",
          token,
          id,
        });
      } else {
        res.send({
          statusCode: 400,
          message: "Invalid User",
        });
      }
    } else {
      res.send({
        statusCode: 400,
        message: "User Does Not Exist",
      });
    }
  }
  catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});

router.post("/searching", async (req, res) => {
  try {
    console.log(req.params.key);
    const keyword = req.body.key;
    const regex = new RegExp(keyword, "i");
    if(keyword.trim()===""){
      return res.send({ statusCode: 200, data: [] });
    }
    let result = await equipementModel2.find({
      "$or": [
        { productname: { $regex: regex } },
        { producttype: { $regex: regex } }
      ]
    }).sort({ 
      productname: 1,
      producttype: 1,
    });

    console.log(result);
    res.send({
      statusCode: 200,
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.send({ statusCode: 400, message: "Internal Server Error", err });
  }
});

router.post("/productadd", async (req, res) => {
  try {
    let products = await equipementModel2.create(req.body);

    res.send({
      statusCode: 200,
      message: "Product Added Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});
router.get("/products", async (req, res) => {
  try {
    let users = await equipementModel2.find();
    res.send({
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});

router.post("/orders", async (req, res) => {
  try {
    let users = await equipementModel.find({roleID:req.body.roleID});
    res.send({
      statusCode: 200,
      cartproducts: users[0].cart,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});
router.get("/:producttype", async (req, res) => {
  try {
    let users = await equipementModel2.find({
      producttype: req.params.producttype,
    });
    res.send({
      statusCode: 200,
      users,
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});
//Adding data to Cart
router.post("/addcart", async (req, res) => {
  try {
    // let token = req.headers.authorization.split(" ")[1]
    // let data = await jwtDecode(token)
    console.log(req.body.roleID);
    let cartupdate = await equipementModel.findOneAndUpdate(
      {roleID:req.body.roleID},
      {
      $push: {
        cart: {
          url: req.body.url,
          productname: req.body.productname,
          price_1hr: req.body.price_1hr,
          days: req.body.difference,
          producttype:req.body.producttype
        }
      }
      },
      {returnOriginal: false }
    )
    let cartvalues=cartupdate[0].cart
    console.log(cartupdate)
    
    res.send({
      statusCode: 200,
      message: "Added to Cart succesfully",
      cartvalues,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.post("/checkout", async (req, res) => {
  try {
    let products = await checkoutModel.create({
      price: req.body.productprice,
    });
    var instance = new Razorpay({
      key_id: RAZORPAY_API_KEY,
      key_secret: RAZORPAY_API_SECRET,
    });
    instance.orders.create({
      amount: req.body.productprice * 100,
      currency: "INR",
    });
    res.send({
      statusCode: 200,
      message: "Order created",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const hmac = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET);

    hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
    let generatedSignature = hmac.digest("hex");

    let isSignatureValid = generatedSignature == payload.razorpay_signature;
  } catch (error) {
    console.log(error);
    res.send({
      statusCode: 500,
      message: "Internal Server Error",
      error,
    });
  }
});

router.put("/deletecart", async (req, res) => {
  try {
    let users = await equipementModel.findOneAndUpdate({roleID:req.body.roleID},{$pull:{cart:{productname:req.body.productname}}},{returnOriginal: false });
    res.send({
      statusCode: 200,
     message:"Deleted Succesfully"
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});
router.put("/editproduct", async (req, res) => {
  try {
    let users = await equipementModel.findOneAndUpdate({roleID:req.body.roleID},{$pull:{cart:{productname:req.body.productname}}},{returnOriginal: false });
    res.send({
      statusCode: 200,
     message:"Deleted Succesfully"
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});
router.delete("/deleteproduct", async (req, res) => {
  try {
    let deleteproductproducts = await equipementModel2.deleteOne({productname:req.body.productname});

    res.send({
      statusCode: 200,
      message: "Product Deleted Sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.send({ statusCode: 400, message: "Internal Server Error", error });
  }
});


module.exports = router;
