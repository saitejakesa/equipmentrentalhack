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

let equipementModel2=mongoose2.model('prducts',productschema)
let checkoutModel = mongoose2.model('checkoutproducts',checkoutmodel)
module.exports={equipementModel2,checkoutModel}