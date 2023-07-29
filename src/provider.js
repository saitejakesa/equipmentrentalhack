import { useState } from "react";
import { CartContext } from "./Context/CartContext";
const Provider = (props) => {
    let [cart,setCart] = useState([])

  return (
    <CartContext.Provider
      value={{
        cart,setCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default Provider;