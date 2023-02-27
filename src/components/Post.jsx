import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaThumbsUp } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import { Link } from "react-router-dom";

/*************bootstrap ************/
import Image from "react-bootstrap/esm/Image";
import Button from "react-bootstrap/Button"; 
import { useContext } from "react";
import { sendPostInfo } from "../App";

const Post = () =>{

const [commentInput, setCommentInput] = useState(false);
//********************* get authorize user here ****************************//
const [user, setUser] = useState("");
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
    },[])

// ***************** userPost data  and comments on their posts *********************//
const [userPost, setUserPost] = useState("");
const [likes , setLikes] = useState("");
const [totalComments, setTotalComments] = useState([])
let postData = useContext(sendPostInfo);

const getposts = async()=>{
    await axios.get("http://localhost:5000/getposts")
    .then(res=>{
         if(res.data){ 
            const result = res.data.result;
            result.map((post)=>{
                if(post._id == postData._id)
                {
                    setUserPost(post)
                    post.comments.sort();
                    post.comments.reverse();
                    setTotalComments(post.comments);
                    setLikes(post.likes);
                }
            })
         }
     }).catch((err)=>{
        console.log(err);
     })
}

//*********************** add like on post *************************//

const addLike = ()=>{
    axios.post("http://localhost:5000/like",{
        id:userPost._id,

    })
}

useEffect(()=>{
    getposts();
})

//*************** start of comments and send it into database ***********************//
const [comment,setComment] = useState("");

async function  postComent(){
        await axios.post("http://localhost:5000/postcomments",{
        postId: userPost._id,
        autherId: user.user._id,
        auther: user.user.name,
        text: comment
 
     }).then(res=>{
        // console.log(res)
     }).catch((err)=>{
        console.log(err);
     })
     }

//************start of using media query in React for different screen size************/
const [width, setWidth] = useState(window.innerWidth);
useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
//************end of using media query in React for different screen size************//

return(
    <>
    {/****************** Main Screen griding ******************/}
        <div className="row" style={{marginTop:"120px"}}>
            <div className="col-lg-1">
            </div>

            <div className="col-lg-8">
            {/****************** start of post griding ******************/}
                <div className="row shadow-lg p-3 mb-5 bg-white" style={{borderRadius:"15px"}}>
                    <div className="col-sm-1">
                        <Image
                            className="border rounded-circle"
                            width={80}
                            height={80}
                            alt="171x180"
                            src={userPost.profilePicture} />
                    </div>
                    <div className="col-11">
                        <h3 style={{color:"#00b4d8"}}>{userPost.auther}</h3>
                        <h2 style={{fontWeight:"bold"}}>{userPost.title} </h2>
                        {userPost.content}
                        <p style={{color:"#00b4d8",fontWeight:"bold"}}>
                            {likes} <FaThumbsUp style={{marginBottom:"5px"}} />
                            <span style={{float:"right"}}>
                                {totalComments.length} Comments
                            </span>
                        </p> 

                        <div>
                            <Button
                                onClick={()=>addLike()}
                                style={{width:"200px", backgroundColor:"white",color:"black"}}>
                                <FaThumbsUp style={{marginBottom:"5px"}} /> Like
                            </Button>
                            <Button
                                onClick={()=>setCommentInput(true)}
                                style={{width:"200px" , backgroundColor:"white",color:"black"}}>
                                <FaComment style={{marginBottom:"5px"}} /> Comment
                             </Button>
                        </div>
                    </div>
                </div>

            {/********************** start of Write a comment on a post ****************************/}
            {commentInput?
            <div className="row " style={{marginTop:"-20px"}}>
                    <div className="col-sm-10">
                        <div class="form-group">
                            <input
                                value={comment}
                                onChange={(event)=>setComment(event.target.value)}
                                style={{borderRadius:"15px"}} 
                                class="form-control" 
                                placeholder="Write a Comment" />
                        </div>
                    </div>
                    <div className="col-2">
                        <Button
                            onClick={()=>postComent()}
                            style={{backgroundColor:"#00b4d8", borderRadius:"20px"}}
                            size="sm"
                            type="submit" >
                                 Comment
                        </Button>
                    </div>
                </div>:null}

            {/********************** end of Write a comment on a post ****************************/}

            {/****************** start of comments to show ******************/}
            {totalComments.map((post)=>(
                <div className="row shadow-lg p-3 mb-5 bg-white" style={{borderRadius:"15px",marginTop:"15px"}}>
                    <div className="col-sm-1">
                        <Image
                            className="roundedCircle"
                            width={40}
                            height={40}
                            alt="171x180"
                            src="nauman.png" />
                    </div>
                    <div className="col-11">
                        <h6 style={{color:"#00b4d8"}}>{post.auther}</h6>
                        {post.text}
                             
                    </div>
                </div>
                ))}

            </div>
            {width<991?
            <>
                <div className="col-lg-3 text-center">
                </div>
            </>:     
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
                        <div className="shadow p-3 mb-5 bg-white position-fixed-bottom"
                        style={{borderRadius:"30px", marginLeft:""}}>
                        <Button style={{backgroundColor:"#00b4d8",borderRadius:"20px", width:"200px"}} size="md">
                            Best Comments
                        </Button>
                    </div>
                    </div>

                    
                </div>
            </>}
        </div>
        </>
    )
}

export default Post;