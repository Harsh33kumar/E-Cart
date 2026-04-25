import React from 'react'
import { NavLink } from 'react-router-dom'
import axios from "axios";
import { useState } from 'react';
function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = form;


    if(!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try{
      const res = await axios.post("/api/auth/signup", form);
      if(res.data.success) {
        alert("Signup successful");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
  console.log("Full error:", error);
  console.log("Response data:", error.response?.data);
  console.log("Status:", error.response?.status);
}
  };

  return (
<>
  <div className="ra_signup_form">
    <h3>Sign Up</h3>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" onChange={(e) => setForm({...form, username: e.target.value})} />
      <input type="email" placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password"  onChange={(e) => setForm({...form, password: e.target.value})} />
      {/* <input type="password" placeholder="Confirm Password"  onChange={(e) => setForm({...form, confirmPassword: e.target.value})} /> */}

      <input type="submit" value="Sign Up" />
      <p><NavLink to="/login">Already have an account? Login</NavLink></p>
      
    </form>
  </div>
</>
  )
}

export default Signup
