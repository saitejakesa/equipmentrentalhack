import "./CartDisplay.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import env from "../environment";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

function CartDisplay() {
  let [data, setData] = useState([]);
  let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
  let [delivery1Address, setDelivery1Address] = useState("");
  let [delivery2Address, setDelivery2Address] = useState("");
  let [contact, setContact] = useState("");
  let [city, setCity] = useState("");
  let [productprice, setproductprice] = useState(0);
  let navigate = useNavigate();
  let ID = sessionStorage.getItem("ID");
  let getproducts = async () => {
    if (ID) {
      let res = await axios.post(`${env.apiurl}/users/orders`, {
        roleID: ID,
      });
      if (res.data.statusCode === 200) {
        setData(res.data.cartproducts);
      } else {
        setToggle(false);
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    }
  };
  //console.log(data.cartproducts[0]);
  const totalprice = async () => {
    let totalVal = 0;
    for (let i = 0; i < data.length; i++) {
      totalVal += data[i].price_1hr * data[i].days;
    }
    setproductprice(totalVal);
  };

  let handelDeleteProduct = async (e) => {
    let res = await axios.put(`${env.apiurl}/users/deletecart`, {
      roleID: ID,
      productname: e.productname,
    });
    console.log(res);
    window.location.reload();
    if (res.data.statusCode === 200) {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  let handelEditProduct = async (e) => {
    let type = e.producttype;
    navigate(`/Allproducts/${type}`);
  };
  useEffect(() => {
    getproducts();
    totalprice();
    handelDeleteProduct();
  }, [data]);

  let handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_zOeywVancEL0nv",
      amount: Number(data.price) * 100,
      currency: data.currency,
      name: "equipment rental",
      order_id: data.id,
      handler: function (response) {
        console.log(response, "132");
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  let handleCheckout = async () => {
    let res = await axios.post(`${env.apiurl}/users/checkout`, {
      productprice,
    });
    let res2 = await axios.post(`${env.apiurl}/users/address`,{
      delivery1Address,
      delivery2Address,
      contact,
      city
    })
    console.log(res);
    if(res2.data.statusCode===200)
      {
          setToggle(false)
          setMessage(res.data.message)
      }
      else
      {
        setToggle(false)
        setMessage(res.data.message)
        setTimeout(()=>{
          setMessage("")
        },3000)
  
      }
    if (res.data.statusCode === 200) {
      setToggle(false);
      setMessage(res.data.message);
      handleOpenRazorpay(res.data.data);
    } else {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="d-flex flex-row mb-3 fullcart">
      <div className="d-flex flex-column mb-3">
        {data?.map((e, i) => {
          return (
            <Card
              className="products"
              style={{ width: "40rem", height: "10rem" }}
            >
              <div className="d-flex flex-row">
                <div className="d-flex align-items-start">
                  <img src={e.url} width="80%" height="80%" />
                </div>
                <div className="d-flex flex-column">
                  <div>{e.productname}</div>
                  <div>Price:{e.price_1hr}</div>
                  <div>No of Days:{e.days}</div>
                  <div>Product Price:{e.days * e.price_1hr}</div>
                </div>
                <div onClick={() => handelEditProduct(e)}>
                  <Button variant="info">Edit Product</Button>{" "}
                </div>
                <div onClick={() => handelDeleteProduct(e)}>
                  <Button variant="primary">Delete Product</Button>{" "}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Card style={{ width: "20rem", height: "30rem" }}>
        <h4>Address Information</h4>
        <Col>
          <FormGroup>
              <Label for="exampleAddress">Address 1</Label>
              <Input
                id="exampleAddress"
                name="address"
                placeholder="1234 Main St"
                onChange={(e) => setDelivery1Address(e.target.value)}
              />
          </FormGroup>
          </Col>
          <Col>
          <FormGroup>
          
              <Label for="exampleAddress2">Address 2</Label>
              <Input
                id="exampleAddress2"
                name="address2"
                placeholder="Apartment, studio, or floor"
                onChange={(e) => setDelivery2Address(e.target.value)}
              />
          </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="exampleCity">City</Label>
              <Input
                id="exampleCity"
                name="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="contactinfo">Contact Info</Label>
              <Input
                id="contactinfo"
                name="contact"
                onChange={(e) => setContact(e.target.value)}
              />
            </FormGroup>
          </Col>
          <div><h6>Total Price Details:{productprice}</h6></div>
        <div className="d-flex justify-content-center align-items-end">
          <Button onClick={handleCheckout} variant="danger">
            Proceed To Payment
          </Button>{" "}
          <br></br>
        </div>
      </Card>
    </div>
  );
}

export default CartDisplay;
