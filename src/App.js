import './App.css';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Admin from './admin/admin';
import Post from './components/Post';
import WebDevelopment from './components/web';
import AppDevelopment from './components/appDev'
import GraphicsDesigning from './components/graphics';
import SendNotification from './admin/SendNotification';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { createContext, useState } from 'react';
import UserProfile from './components/userProfile';

const getPostInfo = createContext();
const sendPostInfo = createContext();

function App() {

  const [userPost,setUserPost] = useState("");
  const postData = (data)=>{
     setUserPost(data);
  }
  return (
    <div className="App">
     <BrowserRouter>

      <div>
      <Navbar />
      </div>
<getPostInfo.Provider value={postData} >
<sendPostInfo.Provider value={userPost}>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="post" element={<Post />} />
          <Route axact path="web_development" element={<WebDevelopment />} />
          <Route axact path="app_development" element={<AppDevelopment />} />
          <Route axact path="graphics_designing" element={<GraphicsDesigning />} />
          <Route exact path="/userprofile" element={<UserProfile />} />
          <Route exact path="signup" element={<SignUp />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="logout" element={<Logout />} />
          <Route exact path="sendNotification" element={<SendNotification />} />
          <Route exact path="admin" element={<Admin />} />
      </Routes>
</sendPostInfo.Provider>
</getPostInfo.Provider>

    </BrowserRouter>

    </div>
  );
}

export default App;
export {getPostInfo,sendPostInfo};
