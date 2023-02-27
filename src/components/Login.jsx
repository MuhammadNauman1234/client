import React, { useState } from "react";
import axios from "axios";
import { NavLink,Link } from "react-router-dom";
import {useFormik} from "formik";
import { loginInSchema } from "../validation";

const initialValues={
    email:"",
    password:""
} 

function Login(){

    
    
    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema: loginInSchema,
        onSubmit: (values,action) =>{
            console.log(values)
            action.resetForm();
        }
    })

    async function  findUser(){
        await axios.post("http://localhost:5000/login",{
        email:values.email,
        password:values.password
 
     }).then(res=>{
         if(res.data.status == "ok"){
            window.location.href="./";
         }
     }).catch((err)=>{
        console.log(err);
     })
     }

    return(
        <>
            <div className="formContainer">
            <div className="innerContainer shadow"
                style={{padding:"50px", borderRadius:"15px", marginTop:"200px", width: "25%",backgroundColor:"white"}}>
                
                <form onSubmit={handleSubmit}>
                
                <div style={{marginBottom:"40px"}}>
                    <span style={{borderRadius: "5px",}}>
                        Sign In
                    </span>
                </div>
                    <div className="form-group">
                        <input
                            value={values.email} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name = "email" type="email"
                            className="border-top-0 border-right-0 border-left-0 form-control input" aria-describedby="emailHelp" required placeholder="Email" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}

                        {errors.email  && touched.email ? <p className="form_error">{errors.email}</p> : null}

                    </div>
                    <div className="form-group">
                        <input
                            style={{border: "0 0 1px 0"}}
                            value={values.password} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password" type="password"
                            className="border-top-0 border-right-0 border-left-0 form-control password input" required placeholder="Password" />

                            {errors.password  && touched.password ? <p className="form_error">{errors.password}</p> : null}

                    </div>
                    
                    <button onClick={()=>findUser()} type="submit" className="btn btn-primary formBtn" style={{color:"white",marginTop:"40px"}} size="sm">
                        Sign In
                    </button>

                    <div>
                        <span>If you are new<span><Link to="/signup"> create account </Link></span></span>
                        
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Login;