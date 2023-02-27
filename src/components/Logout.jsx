import { NavLink } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import { Modal } from "react-bootstrap";
const Logout = ()=>{

    const userLogout = async()=>{
        await axios.get("http://localhost:5000/logout")
        .then(res=>{
         if(res.data){
            window.location.href="./login";
         }
     }).catch((err)=>{
        console.log(err);
     })
    }
    
    return(
        <>
            <Modal.Dialog style={{marginTop:"150px"}}>
        <Modal.Header>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>if You want to logout click on logout</p>
        </Modal.Body>
    
        <Modal.Footer>
          <Button
            onClick={()=>userLogout()}
            type="submit"
            style={{backgroundColor:"#00b4d8",borderRadius:"20px", width:"100px"}}>
                <NavLink className="nav-link" to="/login" style={{color:"white"}} > logout </NavLink> 
          </Button>
          {/* <Button onClick={()=>setShow(false)} variant="secondary">
            Close
          </Button> */}
        </Modal.Footer>
      </Modal.Dialog>
        </>
    )
}

export default Logout;

