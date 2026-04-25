import React, {  useContext } from 'react'
import axios from 'axios';
import {userDataContext} from "../context/UserContext";

function Home() {
  let { userData } = useContext(userDataContext);

  const handleClick = async () => {
    try{
      let logout = await axios.post('/api/auth/logout');
      console.log(logout);
      window.location.href = "/login";
    }catch(error){
      console.log(error)
    }
  }

  return (
<div className="ra_home_container">


  <div>
    <h1>Hii, {userData?.username}</h1>
    <p>Free Online Resume Builder</p>
    <p>Build a job-winning resume for free</p>
    <p>
      Your first resume is 100% free forever. Unlimited downloads. 
      No hidden fees. Yes, really 🚀
    </p>
    <button type="button" className="ra_home_cv_button0" onClick={handleClick}>
      Logout
    </button>

  </div>
</div>
  )
}

export default Home
