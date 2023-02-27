import {React, useState, useEffect} from "react";
import "../App.css"
import { BsCartCheckFill } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
import { InputGroup } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { FaBell } from 'react-icons/fa';

function Navbar(props){

    //************start of using media query in React for different screen size************/
    const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
//************end of using media query in React for different screen size************/

    const [status, setStatus] = useState("");
    const [user, setUser] = useState("")

    const getData = async()=>{
        await axios.get("http://localhost:5000/userData")
        .then(res=>{
         if(res.data){
            setStatus({status:res.data.status});
            setUser(res.data.data);
         }
     }).catch((err)=>{
        console.log(err);
     })
    }
    useEffect(()=>{
        getData();
    });

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow p-3 mb-5 bg-white rounded" style={{backgroundColor: "#e0dcdc"}}>
               <Link className="navbar-brand" to="#">
                {/* <Button style={{backgroundColor:"#00b4d8", borderRadius:"20px"}} size="md">
                    We Are Family
                </Button> */}
                <img src="austlogo2.png" width={110}></img>
               </Link>

                {/* <div className="text-center">
                    <input
                        className=""
                        style={{borderRadius:"15px"}}           
                        class="form-control" 
                        id="exampleInputEmail1" 
                        placeholder="Search"></input>
                </div> */}
            <InputGroup style={{borderRadius:"20px", width:width<831? (null): ("600px")}}>
                <Form.Control
                    placeholder="Search"
                    />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
               </button>

               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <li className="nav-item active"> */}
                        {/* </li> */}
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link to="/logout" className="nav-link" >
                               <FaBell style={{width:"35px", height:"35px", color:"#00b4d8"}} />         
                            </Link>
                        </li>
                        <li className="nav-item active">
                        <Link to="/" className="nav-link" ><Button style={{backgroundColor:"#00b4d8", borderRadius:"20px"}} size="md">
                            Home
                        </Button>
                        </Link>
                        </li>
                        {/* <li className="nav-item active">
                        <Link to="/menu" className="nav-link" >Menu</Link>
                        </li> */}
                        { status ?(
                            <>
                                <li className="nav-item active">
                                    <Link to="/logout" className="nav-link" >
                                        <Button style={{backgroundColor:"#00b4d8",borderRadius:"20px", width:"80px"}} >
                                            Logout
                                        </Button>
                                    </Link>
                                </li>
                            </>
                        ):(
                            <>
                                <li className="nav-item active">
                                    <Link to="/login" className="nav-link" >
                                        <Button style={{backgroundColor:"#00b4d8",borderRadius:"20px", width:"80px"}}>
                                        Sign in
                                        </Button>
                                    </Link>
                                </li>
                            </>
                        )}
                        { status?(
                        <Link to="/userprofile" className="nav-link" >
                            <Image
                                        className="border rounded-circle"
                                        width={50}
                                        height={50}
                                        src={user.profilePicture}
                                    />
                        </Link>
                        ):(
                            <li className="nav-item active">
                                <Link to="/signup" className="nav-link rounded" >
                                    <Button style={{backgroundColor:"#00b4d8",borderRadius:"20px", width:"80px"}}>
                                        Sign up
                                    </Button>
                                </Link>
                            </li>
                        )}
                        
                        
                        {/* <li className="nav-item active cartIcon">
                        <Link to="/cart" className="nav-link" ><BsCartCheckFill style={styling} /><span style={{color:"red"}}>{props.selectItems.length>0 ?<span>{props.selectItems.length}</span>:<span></span>}</span></Link>
                        </li> */}
                    </ul>
    
                </div>
            </nav>
        </div>
    )
}

export default Navbar;