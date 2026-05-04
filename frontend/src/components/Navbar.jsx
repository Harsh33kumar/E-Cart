import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { userData, getCurrentUser } = useContext(userDataContext);

  const [cartCount, setCartCount] = useState(0);

  /* =============================
      FETCH CART COUNT
  ============================= */
  const fetchCartCount = async () => {
    try {
      const res = await axios.get("/api/cart/list", {
        withCredentials: true,
      });
      setCartCount(res.data?.carts?.length || 0);
    } catch (error) {
      console.log("Cart error:", error);
    }
  };

  /* =====================================
      LOGOUT
  ===================================== */
  const handleLogout = async () => {
    try {
      let logout = await axios.post("/api/auth/logout");
      console.log(logout);
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  /* =============================
      INITIAL LOAD
  ============================= */
  useEffect(() => {
    const init = async () => {
      // await getCurrentUser();
      await fetchCartCount();
    };
    init();
  }, []);

  /* =============================
      DEBUG USER (optional)
  ============================= */
  useEffect(() => {
    console.log("Navbar user:", userData);
  }, [userData]);

  const navStyle = ({ isActive }) =>
    isActive
      ? " text-white-400 font-semibold"
      : "text-white hover:text-cyan-400";

  return (
    <nav className="bg-[#0f172a] text-white shadow-lg px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* LOGO */}
      <Link to="/" className="text-3xl font-bold text-cyan-400">
        E-Cart
      </Link>

      {/* MENU */}
      <div className="flex gap-6 items-center text-lg">

        <NavLink to="/" className={navStyle}>Home</NavLink>
        <NavLink to="/collections" className={navStyle}>Collections</NavLink>
        <NavLink to="/products" className={navStyle}>Products</NavLink>
        <NavLink to="/about" className={navStyle}>About</NavLink>
        <NavLink to="/contact" className={navStyle}>Contact</NavLink>

        {/* CART */}
        <NavLink to="/cart" className="relative hover:text-cyan-400">
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-xs px-2 py-[2px] rounded-full">
              {cartCount}
            </span>
          )}
        </NavLink>

        {/* AUTH BUTTONS */}
        {userData?.email ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/signup"
              className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600"
            >
              Signup
            </NavLink>

            <NavLink
              to="/login"
              className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600 "
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;