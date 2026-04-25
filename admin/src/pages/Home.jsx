import React from 'react';
import axios from 'axios';

function Home() {


  const handleClick = async () => {
    const logout = axios.post('/api/admin/logout')

  }

  return (
<div className="ra_home_container">

  <div>
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
