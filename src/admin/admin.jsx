import react from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Admin = ()=>{

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
           <h3 style={{textAlign:"center",padding:"100px"}}>Welcome to Admin panel</h3>

        
           <Table striped bordered hover>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>send Notification</th>
        </tr>
      </thead>
      
      <tbody>
        {users.map((user)=>(
        <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>
            <Button onClick={user(user)} variant="secondary" size="lg" active>
               <Link style={{color: "white", textDecoration:"none"}} to="/sendNotification">Notification</Link>
            </Button>
          </td>
        </tr>
        ))}
      </tbody>
      
    </Table>
    
        </>
    )
}

export default Admin;