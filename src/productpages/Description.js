import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import env from '../environment'

function Description() {
    let [data, setData] = useState([])
  let params = useParams()
  let getproducts = async () => {

    let res = await axios.get(`${env.apiurl}/users/${params.producttype}`)
    if (res.data.statusCode === 200) {
        res.data.users.map((e)=>{
            return e.description=e.description.split(",")
          })
      setData(res.data.users)
    }
    else {
      alert(res.data.message)
    }
  }

  useEffect(() => {

    getproducts()
  }, [])

  
  return <>
  <div style={{
          display: 'flex',
          flexDirection: 'row'}}>
      {
      data.map((e,i)=>{
        return <div key={i}>
      <h4>Product Descrition</h4>
          <ul>
          {e.description.map((ele)=>(<li>{ele}</li>))}
          </ul>
          </div>
      })}
      </div>
      </>

    }
export default Description