import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';
import env from '../environment'
import {useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';
import { CartContext } from '../Context/CartContext';

function Productpage(){
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const user = useContext(CartContext);
    
    let getproducts = async () => {
        
        let res = await axios.get(`${env.apiurl}/users/products`)
        console.log(res.data)

        if (res.data.statusCode === 200) {
         const hashMap = res.data.data.reduce((acc, cur) => {
            return {...acc, [cur.producttype]: cur }; 
          }, {});
        setData(Object.values(hashMap));
        }
        else {
          alert(res.data.message)
        }
      }
    
      useEffect(() => {
        getproducts()
      }, [])
      const styles = {
        display: 'flex',
        flexDirection: user.isLargeScreen ? 'row' : 'column',
        width: '100%',
      };

  return <>
  <div><Navbar /></div>
  <div style={styles}>
      {
      data.map((e,i)=>{
        return <div key={i} onClick={()=>navigate(`/Allproducts/${e.producttype}`)}>
            <Card style={{width:"100%", height:"250px"}}>
                <CardImg
                alt="Card image cap"
                src={e.url}
                top
                width="50%"
                height="60%"
                />
                <CardBody>
                <CardTitle tag="h5">
                    {e.producttype}
                </CardTitle>              
                </CardBody>
            </Card>
            </div>
      })
      }
      </div>
    </>
    
}

export default Productpage