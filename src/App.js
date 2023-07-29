
import './App.css';

import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Login from './Pages/Login';
import HomePage from './Pages/HomePage';
import Productadd from './Pages/Productadd';
import ProductInformation from './Information/ProductInformation';

import Navbar from './Components/Navbar';
import Allproducts from './productpages/Allproducts';
import CartDisplay from './Pages/CartDisplay';
import React, { useState } from 'react'; 
import Signup from './Pages/Signup';
import { CartContext } from './Context/CartContext';
import { useMediaQuery } from 'react-responsive';


function App(){
  let [roleID,setroleID]=useState(0)
  const isLargeScreen = useMediaQuery({ query: '(min-width: 600px)' });
  console.log(roleID)
  return (
    <div className="App">
      <BrowserRouter>
      <CartContext.Provider value={{roleID,setroleID, isLargeScreen}}>
      <Routes>
      
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/signup' element={<Signup />} ></Route>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/productadd' element={<Productadd />}></Route>
        <Route path='/productinfo' element={<ProductInformation />}></Route>
        <Route path='/Allproducts/:producttype' element={<Allproducts />}></Route>
        <Route path='/cart' element={<CartDisplay />}></Route>
        <Route path='*' element={<Navigate to={'/login'}/>}/>
        
      </Routes>
      </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
