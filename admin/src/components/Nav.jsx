import { NavLink, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import axios from 'axios'
import { adminDataContext } from "../context/UserContext";
function Nav() {
  let {getAdmin} = useContext(adminDataContext);

  const logout_handller = async () =>{
    try {
      const result = await axios.post('/api/auth/logout',{withCredentials:true})
      console.log(result.data);
      getAdmin();
      Navigate('/login');
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="navbar">
        <Link to="/" className="navbar-logo">
          My-Store
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Orders
        </NavLink>
        <NavLink
          to="/addt"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add
        </NavLink>
        <NavLink
          to="/lists"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Lists
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={logout_handller}
        >
          Logout
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      </div>
    </>
  );
}

export default Nav;
