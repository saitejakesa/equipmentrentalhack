import React, { useState } from "react";
import "./ProductInformation.css";
import { Formik, Field, FormikHelpers } from "formik";
import {
  FormGroup,
  Row,
  Col,
  Label,
  Input,
  Form,
  Button,
  Spinner,
} from "reactstrap";
import axios from "axios";
import env from "../environment";
import Navbar from "../Components/Navbar";

const ProductInformation = () => {
  let [productType,setProductType]=useState("")
    let [productName,setProductName]=useState("")
    let [ProductDescription,setProductDescription]=useState("")
    let [productInformation,setProductInformation]=useState("")
    let [toggle,setToggle]=useState(false)
    let [message,setMessage]=useState("")
  let handleClick=async()=>{
    setToggle(true)
      let res = await axios.post(`${env.apiurl}/users/productinfo`,{
        productType,
        productName,
        ProductDescription,
        productInformation


      })
      if(res.data.statusCode===200)
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
  }
  return (
    <div>
      <div>
      <Navbar />
      </div>
      <div>
      <Form>
        <h1>Product Information Required</h1>

        <FormGroup row>
          <Label for="productType" sm={2}>
            Product Type:
          </Label>
          <Col sm={6}>
            <Input id="productType" placeholder="Type of the Product"  onChange={(e)=>setProductType(e.target.value)} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="ProductName" sm={2}>
            Product Name:
          </Label>
          <Col sm={6}>
            <Input id="productName" placeholder="Name of the Product"  onChange={(e)=>setProductName(e.target.value)} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="ProductDescription" sm={2}>
            Product Description:
          </Label>
          <Col sm={6}>
            <Input
              id="productDescription"
              type="textarea"
              placeholder="Description about the Product"
              onChange={(e)=>setProductDescription(e.target.value)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="productInformation" sm={2}>
            Product Information:
          </Label>
          <Col sm={6}>
            <Input
              id="productInformation"
              type="textarea"
              placeholder="What Information needed about the Product?"
              onChange={(e)=>setProductInformation(e.target.value)}
            />
          </Col>
        </FormGroup>

        <Row>
          <Col md={6}>
            <Button onClick={()=>handleClick()}>Submit</Button>
          </Col>
        </Row>
        {toggle?<Spinner animation="border" variant="primary" />:<></>}
        {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
      </Form>
      <div>
        <h4>Note:</h4>We will send you any return mail or asssign any
        representative for you
      </div>
      </div>
    </div>
  );
};

export default ProductInformation;
