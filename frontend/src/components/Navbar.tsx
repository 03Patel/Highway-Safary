import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";
import { LogOut } from "lucide-react";
import { div } from "framer-motion/client";

function Navbar() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="destination">Destinations</Link></li>
      <li><Link to="blog">Blog</Link></li>
      <li><Link to="contact">Contact</Link></li>
    </>
  )

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }

  }, [])



  return (
    <div className={` max-w-screen-2xl containter mx-auto bg-white text-black sticky top-0 left-0 right-0 z-50
     ${sticky ? "sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out" : ""}
    `}>
      <div className="navbar md:px-20 px-4  ">

        {/* LEFT */}
        <div className="navbar-start">

          {/* MOBILE MENU */}
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-64 p-4 shadow-xl border "

            >

              {navItems}

              {state.isAuthenticated && role === "user" && (
                <>
                  <li><Link to="/mybookings">My Bookings</Link></li>

                </>
              )}

              {state.isAuthenticated && role === "admin" && (
                <>
                  <li><Link to="/bookingdetails">Bookings</Link></li>

                </>
              )}


            </ul>
          </div>

          {/* LOGO */}
          <Link
            to="/"
            className="md:text-3xl font-extrabold bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition duration-300"
          >
            Highway Safary
          </Link>
        </div>

        <div className="navbar-end">
          {/* CENTER MENU (DESKTOP) */}
          <div className=" hidden lg:flex ">

            <ul className="menu menu-horizontal px-1">
              {navItems}
              {state.isAuthenticated && role === "user" && (
                <>
                  <li><Link to="/mybookings">My Bookings</Link></li>
                </>
              )}

              {state.isAuthenticated && role === "admin" && (
                <>
                  <li><Link to="/bookingdetails">Bookings</Link></li>
                </>
              )}

            </ul>
          </div>


          {state.isAuthenticated ? (
            <button
              onClick={logout}
              className=" bg-red-500 text-white p-2 rounded-md cursor-pointer hover:bg-red-700 duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className=" bg-black text-white p-2 rounded-md cursor-pointer hover:bg-slate-800 duration-300"
            >
              Login
            </button>
          )
          }
        </div>




      </div>
    </div>
  );
}

export default Navbar;
