const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const saltround=10
const secretkey="Abrnm0386*39&!2"

let hashpassword = async (password)=>{
    let salt= await bcrypt.genSalt(saltround)
    console.log(salt)
    let hashedpassword= await bcrypt.hash(password,salt)
    return hashedpassword
}
let hashcompare= async(password,hashedpassword)=>{
    return bcrypt.compare(password,hashedpassword)
}

let createToken= async(email,role)=>{
    let token= await jwt.sign({email,role},secretkey,{expiresIn:'30m'})
    return token    
}

let validate=async(token)=>{
    let data=await jwt.decode(token)
    return data
}
let validatetoken=async(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1]
    console.log(token)
    let data=await validate(token)
    let currentTime = Math.round(new Date()/1000)
    if(currentTime<=data.exp)
       next()
    else
        res.send({
            stausCode:401,
            message:"Token Expired"
        })
}
let roleAdmin = async(req,res,next)=>{
    let token = req.headers.authorization.split(" ")[1]
    let data = await jwtDecode(token)
    if(data.role=="admin")
       next()
    else
        res.send({
            stausCode:401,
            message:"Unauthorized! Only Admin can access!"
        })
}
module.exports={hashpassword,hashcompare,createToken,validate,validatetoken,roleAdmin}