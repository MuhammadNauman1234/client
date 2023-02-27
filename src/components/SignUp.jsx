import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/signUp.css";
import axios from "axios";
import {useFormik} from "formik";
import { signUpUser } from "../store/store";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { signUpSchema } from "../validation/index";
import { Dropdown, Button } from 'react-bootstrap';

const initialValues={

    name:"",
    email:"",
    phone:"",
    category:"",
    password:"",
    confirmPassword:"",
    

} 

function SignUp(){

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values,action) =>{
            console.log(values)
            action.resetForm();
        }
    })
 
    const dispatch = useDispatch()
    var message = useSelector((state)=>state.signUp.msg);
    console.log(message);

    const registerHandle = ()=>{
        dispatch(signUpUser(values));
    }

    if(message=="ok"){
        return <Navigate to="/login" />
    }

    return(
        <>
        <div className="formContainer">
            <div className="innerContainer shadow"
                style={{padding:"50px", borderRadius:"15px", marginTop:"150px", width: "25%",backgroundColor:"white"}}>
                
                <form onSubmit={handleSubmit}>
                
                <div style={{marginBottom:"40px"}}>
                    <span style={{borderRadius: "5px",}}>
                        Sign Up
                    </span>
                </div>
                    <div className="form-group">
                        <input
                            value={values.name} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="name" type="text" className="form-control input" placeholder="Enter Name" />

                            {errors.name  && touched.name ? <p className="form_error">{errors.name}</p> : null}
                            
                    </div>
                    <div className="form-group">
                        <input
                            value={values.email} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name = "email" type="email" className="form-control input" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        
                        {errors.email  && touched.email ? <p className="form_error">{errors.email}</p> : null}
                    </div>
                    <div className="form-group">
                        <input
                            value={values.phone} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name = "phone" type="text" className="form-control input" aria-describedby="emailHelp" placeholder="Enter Phone Number" />
                            
                            {errors.phone  && touched.phone ? <p className="form_error">{errors.phone}</p> : null}
                    </div>
                    <div>
                    <select
                        value={values.category} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="category"
                        style={{marginBottom:"10px"}}
                        className="form-control">
                        <option value="Select Category">Select Category</option>
                        <option value="Web Development">Web Developer</option>
                        <option value="App Development">App Developer</option>
                        <option value="Graphics Designing">Graphics Designer</option>
                        <option value="3D Animations">3D Animations</option>
                    </select>
                        {errors.category  && touched.category ? <p className="form_error">{errors.category}</p> : null}
                    
                    </div>
                    <div className="form-group">
                        <input
                            value={values.password} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password" type="password" className="form-control password input" placeholder="Password" />
                            
                            {errors.password  && touched.password ? <p className="form_error">{errors.password}</p> : null}

                    </div>
                    <div className="form-group">
                        <input
                            value={values.confirmPassword} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="confirmPassword" type="password" className="form-control password input" placeholder="Confirm Password" />
                            
                            {errors.confirmPassword  && touched.confirmPassword ? <p className="form_error">{errors.confirmPassword}</p> : null}

                    </div>
                    
                    <button onClick={()=>registerHandle()} type="submit" className="btn btn-primary formBtn " style={{color:"white"}}>
                        Sign In
                    </button>

                    <div>
                        <span>If you have account please<span><Link to="/login"> Login </Link></span></span>
                        
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default SignUp;





// async function  postUser(){
    //    await axios.post("http://localhost:5000/registration",{
    //    name:userData.name,
    //    email:userData.email,
    //    password:userData.password,
    //    confirmPassword:userData.confirmPassword

    // }).then(res=>{
    //     if(res.data.message){
    //         setMessage(res.data.message);
    //     }
    //     else if(res.data.ok){
    //         history('/login');
    //     }
    // })
    // }