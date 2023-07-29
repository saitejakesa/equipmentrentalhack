// import React from 'react'
// import './ProductInformation.css'
// import { Formik, Field, Form, FormikHelpers } from 'formik';
// import { Navbar } from 'reactstrap';



// function ProductInformation() {
//   return (
    
//     <div className='FullInfo'>
//         <div className="contactinfo">
//             <div><h1>Contact Information</h1></div>
//             <div className='dpname'><div>Developer Name:</div>Sai Teja</div>
//             <div className='cname'><div>Company Name:</div>Sri Venkateshwara equipment rental</div>
//             <div className='smail'><div>Site Mail:</div> demo@gmail.com</div>
//             <div className='tollno'><div>Toll Free No:</div>9945600000</div>
//         </div>
//         <div className='ProductContact'>
//         <div><h1>Product Related Queries</h1></div>
//     <Formik
//         initialValues={{
//             productType: '',
//             productName: '',
//             productDescription: '',
//             ProductInformation: '',
//           }}
//           // onSubmit={(
//           //   values: Values,
//           //   { setSubmitting }: FormikHelpers<Values>
//           // ) => {
//             // setTimeout(() => {
//             //   alert(JSON.stringify(values, null, 2));
//             //   setSubmitting(false);
//             // }, 500);
//             onSubmit={(
//               setToggle(true)
//               let res = await axios.post(`${env.apiurl}/users/login`,{
//                 values:Values
//               })
//               if(res.data.statusCode===200)
//               {
//                   setToggle(false)
//                  sessionStorage.setItem('token',res.data.token)
//                  sessionStorage.setItem('ID',res.data.id)
//                  navigate('/')
//               }
//               else
//               {
//                 setToggle(false)
//                 setMessage(res.data.message)
//                 setTimeout(()=>{
//                   setMessage("")
//                 },3000)
          
//               }
//             }
//            }}
//     >
//         <Form>
//         <div className='type'>
//           <label htmlFor="productType" id="ProductType">Product Type</label>
//           <Field name="productType" placeholder="Type of the Product" />
//         </div>
//         <div className='name'>
//           <label htmlFor="productName" id="ProductName">Product Name</label>
//           <Field name="productName" placeholder="Name of the Product" />
//         </div>
//         <div className='description'>
//           <label htmlFor="productDescription" id="ProductDescription">Product Description</label>
//           <Field id="productDescription" name="productDescription" placeholder="Description about the Product" />
//         </div>
//         <div className='information'>
//           <label htmlFor="productInformation" id="Productinfo">Product Information</label>
//           <Field id="productInformation" name="productInformation" placeholder="What Information needed about the Product?" />
//         </div>
//         <div className='submit'>
//           <button type="submit">Submit</button>
//         </div>
//         </Form>
//     </Formik>
//         </div>
//     </div>
//   )
// }

// export default ProductInformation