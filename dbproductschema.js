const { urlencoded } = require('express')
const mongoose2 = require('mongoose')
const validator= require('validator')


var productschema = new mongoose2.Schema({
    url:{type:'string',required:true},
    productname:{type:'string',required:true},
    price_1hr:{type:'Number',required:true},
    Fromdate:{type:Date},
    Todate:{type:Date},
    producttype:{type:'string',required:true},
    description:{type:'string'},
    createdAt:{type:Date,default:Date.now()},
})

var checkoutmodel = new mongoose2.Schema({
    price: {type:'Number'}
})

var productInformation=new mongoose2.Schema({
    productType:{type:'string',required:true},
    productName:{type:'string',required:true},
    ProductDescription:{type:'string',required:true},
    productInformation:{type:'string',required:true}
})
var addressinformation=new mongoose2.Schema({
    delivery1Address:{type:'string',required:true},
    delivery2Address:{type:'string',required:true},
    contact:{type:'string',required:true},
    city:{type:'string',required:true}
})

let equipementModel2=mongoose2.model('prducts',productschema)
let checkoutModel = mongoose2.model('checkoutproducts',checkoutmodel)
let info = mongoose2.model('information',productInformation)
let address = mongoose2.model('addresses',addressinformation)
module.exports={equipementModel2,checkoutModel,info}