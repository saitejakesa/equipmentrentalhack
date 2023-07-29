import React, { useState } from 'react'
import { Button, Form } from 'reactstrap'

function Address() {
    let [total,setTotal]=useState(0)
    let [deliveryAddress,setDeliveryAddress] = useState("")
    let [contact,setContact] = useState("") 
    let updateaddress = async ()=>{
    }
  return <>
    <div className='add-food-wrapper col-4'>
  <Form>
    <Form.Group className="mb-3" >
      <Form.Control type="text"  placeholder="Delivery Address" onChange={(e)=>setDeliveryAddress(e.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3">
      <Form.Control type="text"  placeholder="Contact Number" onChange={(e)=>setContact(e.target.value)}/>
    </Form.Group>


    <Button variant="primary" >
      Submit
    </Button>
    </Form>
    </div>
  </>
}

export default Address