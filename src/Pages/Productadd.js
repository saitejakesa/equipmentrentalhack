import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label } from "reactstrap";
import env from "../environment";
import Spinner from 'react-bootstrap/Spinner';

function Productadd() {
  let [url,seturl]=useState("")
    let [price_1hr,setprice_1hr]=useState("")
    let [producttype,setproducttype]=useState("")
    let [productname,setproductname]=useState("")
    let [description,setdescription]=useState("")
    let [message,setMessage]=useState("")
    let [toggle,setToggle]=useState(false)

  let handleLogin = async ()=>{
    setToggle(true)
    let res = await axios.post(`${env.apiurl}/users/productadd`,{
      url,
      price_1hr,
      producttype,
      description,
      productname
    })
    if(res.data.statusCode===200)
    {
      setToggle(false)
       setMessage(res.data.message)
       setTimeout(()=>{
        setMessage("")
      },3000)
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
    <div className="ProductAdd">
      <h1>Product Add</h1>
      <h3>You can add product here</h3>
      <Form>
      <Col>
          <FormGroup>
            <div className="d-flex flex-row">
              <Label for="price">Product Name</Label>
              <Input
                id="productname"
                name="productname"
                placeholder="Name of the Product"
                onChange={(e)=>setproductname(e.target.value)}
              />
            </div>
          </FormGroup>  
        </Col>
        <Col>
          <FormGroup>
            <div className="d-flex flex-row">
              <Label for="URL">Image URL:</Label>
              <Input id="url" name="URL" placeholder="Enter Image URL" onChange={(e)=>seturl(e.target.value)} />
            </div>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <div className="d-flex flex-row">
              <Label for="price">price_perday</Label>
              <Input
                id="price_1hr"
                name="price_1hr"
                placeholder="Enter Price for 1day here"
                onChange={(e)=>setprice_1hr(e.target.value)}
              />
            </div>
          </FormGroup>  
        </Col>
       
        <FormGroup>
          <div className="d-flex flex-row">
            <Label for="producttype">Product Type</Label>
            <Input
              id="producttype"
              name="producttype"
              placeholder="Type of Product should be according to home page product types"
              onChange={(e)=>setproducttype(e.target.value)}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <div className="d-flex flex-row">
            <Label for="Description">Product Description</Label>
            <Input
              id="description"
              name="ProductDescription"
              placeholder="Description about the Product"
              onChange={(e)=>setdescription(e.target.value)}
            />
          </div>
        </FormGroup>
        <Button varient="primary" onClick={()=>handleLogin()}>
          Add Product</Button>
      </Form>
      {toggle?<Spinner animation="border" variant="primary" />:<></>}
      {message?<div style={{"color":"red","textAlign":"center"}}>{message}</div>:<></>}
    </div>
  ); 
}

export default Productadd;
