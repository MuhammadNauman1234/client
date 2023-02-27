import react from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';


const Admin = ()=>{

    const [sideNavOpen, setSideNavOpen] = useState(false);
    const toggleSideNav = () => {
  setSideNavOpen(!sideNavOpen);
   };
    const [users, setUsers] = useState([]);

    const getAllUsers = async()=>{
        await axios.get("http://localhost:5000/users",)
        .then(res=>{
         if(res.data){
            const data = res.data.data;
            setUsers([...users, ...data]);
         }
     }).catch((err)=>{
        console.log(err);
     })
    }

    useEffect(()=>{
        getAllUsers();
    },[]);

    return(
        <>
          <Nav
            style={{marginTop:"200px", width: "15%"}}
            className={`d-md-block sidebar ${sideNavOpen ? 'open' : 'closed'}`} id="sidebar">
            <div className="sidebar-sticky">
              <h3>Side Navigation</h3>
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </div>
          </Nav>
    
        </>
    )

}

export default Admin;