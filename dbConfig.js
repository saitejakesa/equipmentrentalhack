// const mongodb = require('mongodb')
const mongoose = require('mongoose')
const dbName = 'EquipmentRental'
const dbUrl = 'mongodb+srv://saiteja:Saiteja03@saiteja.kzonzsq.mongodb.net/EquipmentRental'
const connectdb=async()=>{
    await mongoose.connect(dbUrl, {useNewUrlParser: true})
    console.log("db connected")
}
RAZORPAY_API_KEY="rzp_test_zOeywVancEL0nv"
RAZORPAY_API_SECRET="Yk2FK4LNRCFsWkyRO6ivBUfw"

module.exports ={connectdb,RAZORPAY_API_KEY,RAZORPAY_API_SECRET}