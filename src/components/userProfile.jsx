import react from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { getPostInfo } from "../App";
/************* react-bootstrap ************/
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import { StaticExample } from "./Home";

const UserProfile =()=>{

    const postData = useContext(getPostInfo);
    const [show, setShow] = useState(false);

    const postPlaceholder = "What's on your mind? click here"

//************************* change profile picture ***************************/
const [profilePicture, setProfilePicture] = useState("initial_picture.jpg");
    const [pictureFile, setPictureFile] = useState(null);

    const handleClick = () => {
        // Get the file input element
        const input = document.getElementById('picture-input');
        // Trigger a click event on the file input element
        input.click();
    }

    const handleChange = (event) => {
        const file = event.target.files[0];
        setPictureFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            // setProfilePicture(reader.result);
            axios.post("http://localhost:5000/update_profilePicure",{
                userId : user.user._id,
                profilePicture: reader.result,
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        reader.readAsDataURL(file);
    }

//************************* getting outherized user ***************************//
const [user, setUser] = useState();
const getData = async()=>{
        await axios.get("http://localhost:5000/userData",{
        token: window.localStorage.getItem("token"),
 
     }).then(res=>{
         if(res.data){
            setUser({user:res.data.data});
         }
     }).catch((err)=>{
        console.log(err);
     })
    }
    useEffect(()=>{
        getData();
    })

//********************** getting user posts *************************//
const [posts, setPosts] = useState([]);

const getposts = async()=>{
    await axios.get(`http://localhost:5000/userposts/${user.user._id}`)
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

return(
    <>
    {/****************** start of Main Screen griding ******************/}
        <div className="row flex-row" style={{marginTop:"120px"}}>
            <div className="col-lg-1">
            </div>
            <div className="col-lg-8">
                { user ?<>
                <div className="row shadow p-3 mb-5 bg-white" style={{borderRadius:"15px"}}>
                    <div className="col-sm-1">
                        <img
                            style={{marginTop:"10px"}}
                            src={user.user.profilePicture}
                            onClick={handleClick}
                            alt="" width="60px" height="60px" className="border rounded-circle"/>
                        <input
                         type="file"
                        id="picture-input" onChange={handleChange} style={{display: "none"}}/>
                    </div>
                    <div className="col-11">
                        <p style={{color:"#00b4d8"}}>{user.user.category}</p> 
                        <form>
                            <div class="form-group border-0">
                                <input
                                    style={{borderRadius:"15px",marginTop:"20px"}}
                                    readOnly
                                    onClick={() => setShow(true)}
                                    class="form-control" 
                                    id="exampleInputEmail1" 
                                    placeholder={postPlaceholder+" "+user.user.name}></input>
                            </div>
                        </form>

                        {show?(<StaticExample show={show} setShow={setShow} user={user.user} />):null}

                    </div>
                </div>
                </>:null}   

     {/************************** start of post griding ******************************/}
                {posts.map((post)=>(

                    <div className="row shadow p-3 mb-5 bg-white" style={{borderRadius:"15px"}}>
                    <div className="col-sm-1">
                        <Image
                            className="border rounded-circle"
                            width={70}
                            height={70}
                            alt="171x180"
                            src={post.profilePicture} />
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
                                <Link style={{color:"black", textDecoration:"none"}} to="/web_development">
                                    Web Development
                                </Link>
                            </h5>
                            <h5 style={{border:"2px solid #00b4d8", borderRadius:"15px", padding:"3px"}}>
                                <Link style={{color:"black", textDecoration:"none"}} to="/app_development">
                                    App Development
                                </Link>
                            </h5>
                            <h5 style={{border:"2px solid #00b4d8", borderRadius:"15px", padding:"3px"}}>
                                <Link style={{color:"black", textDecoration:"none"}} to="/graphics_designing">
                                    Graphics Designing
                                </Link>
                            </h5>
                            <h5 style={{border:"2px solid #00b4d8", borderRadius:"15px", padding:"3px"}}>
                                <Link style={{color:"black", textDecoration:"none"}} to="/animations">
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
    </>
)
}


export default UserProfile;