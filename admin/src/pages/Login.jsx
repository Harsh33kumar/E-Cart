import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { adminDataContext } from '../context/UserContext';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  let {adminData, getAdmin} = useContext(adminDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        // "http://localhost:5000/api/admin/adminlogin",
        "/api/admin/adminlogin",
        form,
        { withCredentials: true }
      );
       console.log(res.data.Token);

      if (res.data.success) {
        alert("Login Successful");
        getAdmin();
        navigate("/");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
      console.log(error)
    }
  };

  return (
    <>
      <div className="ra_login_form">

        <h3>Login</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit">Login</button>

          <p>
            <NavLink to="/signup">
              Don't have an account? Sign Up
            </NavLink>
          </p>

        </form>

      </div>
    </>
  );
}

export default Login;