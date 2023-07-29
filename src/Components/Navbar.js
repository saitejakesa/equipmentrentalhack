import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { Badge } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import env from "../environment";
import { ListGroupItem } from "reactstrap";

function Navbar() {
  const navigate = useNavigate();
  let [length, setlength] = useState(null);
  let [search, setSearch] = useState("");
  let [data, setData] = useState([]);
  let [open, setOpen] = useState("");
  let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  // const [showMediaIcons, setShowMediaIcons] = useState(false);
  let ID = sessionStorage.getItem("ID");
  const gettingproducts = async () => {
    let res = await axios.get(`${env.apiurl}/users/orders`);
    setlength(res.data.data.length);
  };
  // console.log(search)

  const searchproduct = async () => {
    let res = await axios.post(`${env.apiurl}/users/searching`, {
      key: search,
    });
    if (res.data.statusCode === 200) {
      setData(res.data.data);
    } else {
      setToggle(false);
      setMessage(res.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  const openlink = (m) => {
    navigate(`/Allproducts/${m.producttype}`);
  };
  const toggleMenu = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    searchproduct();
  }, [search]);
  useEffect(() => {
    gettingproducts();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      {isMobile ? (
        <div className="mobilepage">
          <div className="navlogo">
            <div className="menu-toggle" onClick={toggleMenu}>
              <MenuIcon />

              {toggle && (
                <div>
                  <div>
                    <Link to="/login">Login</Link>
                  </div>
                  {ID > 0 && ID < 100 ? (
                    <div>
                      <Link to="/productadd">Add Product</Link>
                    </div>
                  ) : null}
                  <div>
                    <Link to="/productinfo">Details</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="nav_search">
            <input
              type="text"
              name="search"
              id="mainsearch"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {data?.map((e, i) => (
              <ListGroupItem key={i} onClick={() => openlink(e)}>
                <div className="product">
                  <div>ProductType:{data[i].producttype}</div>
                  <div>ProductName:{data[i].productname}</div>
                </div>
              </ListGroupItem>
            ))}
          </div>

          <div className="cart_btn">
            <Badge
              badgeContent={length}
              color="primary"
              onClick={() => navigate(`/cart`)}
            >
              <ShoppingBagIcon color="action" />
            </Badge>
          </div>
        </div>
      ) : (
        <header>
          <nav>
            <div className="left">
              <div className="navlogo">
                <img className="resize" src="/logo_edited.png" alt="logo" />
              </div>
              <div className="nav_search">
                <input
                  type="text"
                  name="search"
                  id="mainsearch"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                {data?.map((e, i) => (
                  <ListGroupItem key={i} onClick={() => openlink(e)}>
                    <div className="product">
                      <div>ProductType:{data[i].producttype}</div>
                      <div>ProductName:{data[i].productname}</div>
                    </div>
                  </ListGroupItem>
                ))}
              </div>
              <div></div>
            </div>
            <div className="right">
              <div className="nav_btn">
                <Link to="/login">Login</Link>
              </div>
              {ID > 0 && ID < 100 ? (
                <div className="nav_btn">
                  <Link to="/productadd">Add Product</Link>
                </div>
              ) : null}
              <div className="nav_btn2">
                <Link to="/productinfo">Details</Link>
              </div>
              <div className="cart_btn">
                <Badge
                  badgeContent={length}
                  color="primary"
                  onClick={() => navigate(`/cart`)}
                >
                  <ShoppingBagIcon color="action" />
                </Badge>
              </div>
            </div>
          </nav>
        </header>
      )}
    </div>
  );
}

export default Navbar;
