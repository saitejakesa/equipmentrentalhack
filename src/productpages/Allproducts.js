import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { CartContext } from "../Context/CartContext";
import DatePicker from "react-datepicker";
import Navbar from "../Components/Navbar";

import env from "../environment";
import { useMediaQuery } from 'react-responsive';


function Allproducts() {
  const [data, setData] = useState([]);
  // const [product,setproduct]=useState();
  const user = useContext(CartContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  let [message, setMessage] = useState("");
  let [toggle, setToggle] = useState(false);
  let ID = sessionStorage.getItem("ID");
  let navigate = useNavigate();
  let params = useParams();
  let getproducts = async () => {
    let res = await axios.get(`${env.apiurl}/users/${params.producttype}`);
    console.log(res);
    if (res.data.statusCode === 200) {
      res.data.users.map((e) => {
        return (e.description = e.description.split(","));
      });
      setData(res.data.users);
    } else {
      alert(res.data.message);
    }
  };

  let handelAddProduct = async (e) => {
    const differenceInMs = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);
    const difference = Math.round(differenceInDays);
    console.log(`Difference in days: ${difference}`);
    if (e.hasOwnProperty("difference") && !isNaN(e.d)) {
      e.difference += difference;
    } else {
      e.difference = difference;
    }
    console.log(ID);
    if (ID) {
      let res = await axios.post(`${env.apiurl}/users/addcart`, {
        roleID: ID,
        ...e,
      });
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
    } else {
      setMessage("Login to Continue");
      navigate("/login");
    }
    let token = sessionStorage.getItem("token");
    console.log(token);
  };

  let handelDeleteProduct = async (e) => {
    let res = await axios.delete(`${env.apiurl}/users/deleteproduct`, {
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
    console.log(e);
    let type = e.producttype;
    console.log(type);
    console.log(`${env.frontendurl}//Allproducts/${type}`);
    navigate(`/Allproducts/${type}`);
  };
  
  const styles = {
    display: 'flex',
    flexDirection: user.isLargeScreen ? 'row' : 'column',
    width: '100%',
  };

  useEffect(() => {
    getproducts();
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
        style={styles}
      >
        {data?.map((e, i) => (
          <div key={i}>
            <Card
              style={{
                width: "18rem",
              }}
            >
              <img alt="Sample" src={e.url} style={{ height: "12rem" }} />
              <CardBody>
                <CardTitle tag="h5">{e.productname}</CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                  name="price_1hr"
                >
                  price_perday: {e.price_1hr}
                </CardSubtitle>
                <button onClick={() => handelAddProduct(e)} variant="primary">
                  Add to Cart
                </button>
                {ID > 0 && ID < 100 ? (
                  <div>
                    <button
                      onClick={() => handelEditProduct(e)}
                      variant="primary"
                    >
                      Edit Product
                    </button>
                    <button
                      onClick={() => handelDeleteProduct(e)}
                      variant="primary"
                    >
                      Delete Product
                    </button>
                  </div>
                ) : null}
                <CardSubtitle>
                  Date:
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                  End Date:
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </CardSubtitle>
                {/* <CardText> */}
                <div id="productdescription" name="productdescription">
                  <h4>Product Descrition</h4>
                  <ul>
                    {e.description.map((ele) => (
                      <li>{ele}</li>
                    ))}
                  </ul>
                  {/* </CardText> */}
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}

export default Allproducts;
