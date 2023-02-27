import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
/************* react-bootstrap ************/
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { getPostInfo } from "../App";

//********************** web Development Component *************************//
const WebDevelopment = ()=>{
const postData = useContext(getPostInfo);

//********************** getting user posts *************************//
const [posts, setPosts] = useState([]);
const getposts = async()=>{
    await axios.get("http://localhost:5000/getposts")
    .then(res=>{
         if(res.data){ 
            setPosts(res.data.result);
         }
     }).catch((err)=>{
        console.log(err);
     })
    }

useEffect(()=>{
        getposts();
    });

//************start of using media query in React for different screen size************/
const [width, setWidth] = useState(window.innerWidth);
useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
     
//****************** returning home component html with javaScript *******************//
return ( 
    <div style={{backgroundColor:"white"}}>
            
    {/****************** start of Main Screen griding ******************/}
        <div className="row flex-row" style={{marginTop:"120px"}}>
            <div className="col-lg-1">
            </div>

            <div className="col-lg-8">
        {/************************** start of post griding ******************************/}
                    
                {posts.map((post)=>(
                <div className="row shadow p-3 mb-5 bg-white" style={{borderRadius:"15px"}}>
                    <div className="col-sm-1">
                        <Image
                            className="roundedCircle"
                            width={70}
                            height={70}
                            alt="171x180"
                            src="nauman.png" />
                    </div>
                    <div className="col-11">
                        <h5 style={{color:"#00b4d8"}}>{post.auther} </h5>
                        <h4 style={{fontWeight:"bold"}}>{post.title} </h4>
                        <><span>{post.content.slice(0,200)}</span>
                        <span>
                        <button
                            onClick={()=>postData(post)} 
                            style={{backgroundColor:"#00b4d8",border:"none", color:"white",borderRadius:"10px",marginLeft:"10px"}}>
                            <Link style={{color:"white",textDecoration:"none"}} to="/post">
                                Read more
                            </Link>
                        </button>
                        </span></>                
                    </div>
                </div>
            ))}
        {/************************** end of post griding ******************************/}
        </div>       
            {width<991?null:     
            <>
                <div className="col-lg-2 text-center" style={{borderRadius:"30px", marginLeft:"50px"}}>
                    <div className="shadow p-3 mb-5 bg-white position-fixed"
                        style={{borderRadius:"30px"}}>
                        <Button style={{backgroundColor:"#00b4d8",borderRadius:"20px", width:"200px"}} size="md">
                            Categories
                        </Button>
                        <div style={{marginTop:"10px",color:"#00b4d8"}}>
                            <h5 style={{border:"2px solid #00b4d8", borderRadius:"15px", padding:"3px"}}>
                                <Link style={{color:"black"}} to="/web_development">
                                    Web Development
                                </Link>
                            </h5>
                            <h5 style={{border:"2px solid #00b4d8", borderRadius:"15px", padding:"3px"}}>
                                <Link style={{color:"black"}} to="/app_development">
                                    App Development
                                </Link>
                            </h5>
                            <h5 style={{border:"2px solid #00b4d8", borderRadius:"15px", padding:"3px"}}>
                                <Link style={{color:"black"}} to="/graphics_designing">
                                    Graphics Designing
                                </Link>
                            </h5>
                            <h5 style={{border:"2px solid #00b4d8", borderRadius:"15px", padding:"3px"}}>
                                <Link style={{color:"black"}} to="/animations">
                                    3D Animations
                                </Link>
                            </h5>
                        </div>
                    </div>

                    <div className="shadow p-3 mb-5 bg-white position-fixed-bottom"
                        style={{borderRadius:"30px", marginLeft:""}}>
                        <Button style={{backgroundColor:"#00b4d8",borderRadius:"20px", width:"200px"}} size="md">
                            Top Performers
                        </Button>
                    </div>
                </div>

            </>}
        </div>
            {/****************** end of Main Screen griding ******************/}
    </div>
    )
}


export default WebDevelopment;