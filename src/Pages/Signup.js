
    import React, { useState } from 'react';
    import { useFormik } from 'formik';
import axios from 'axios';
import env from '../environment';
    
    const Signup = () => {
      let [toggle, setToggle] = useState(false);
  let [message, setMessage] = useState("");
      const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
        },
        onSubmit: async(values) => {
          let res=await axios.post(`${env.apiurl}/users/signup`,values)
          if(res.data.statusCode===200){
            setToggle(false);
             setMessage(res.data.message);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
          else{
            setToggle(false);
            setMessage(res.data.message);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
        },
      });
      return (
        <form onSubmit={formik.handleSubmit}>
          <div className='signupfield'>
            <div className='feilds'>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          </div>
          <div className='feilds'>
           
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
           
           </div>
           <div className='feilds'>

          <label htmlFor="email">Email Address:</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          </div>
          <div className='feilds'>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          
          </div>
          
          </div>
          <button type="submit">Submit</button> 
        </form>
      );
    };

export default Signup