import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../reducers/AuthContext";

function Navbar() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // ✅ memoized logout
  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }, [dispatch, navigate]);

  // ✅ memoized nav items
  const navItems = useMemo(() => (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/aboutus">About Us</Link></li>
      <li><Link to="/destination">Destinations</Link></li>
      <li><Link to="/blog">Blog</Link></li>
      <li><Link to="/con">Contact</Link></li>

      {state.isAuthenticated && role === "user" && (
        <li><Link to="/bookingdetails">My Bookings</Link></li>
      )}

      {state.isAuthenticated && role === "admin" && (
        <li><Link to="/bookingdetails">Bookings</Link></li>
      )}
    </>
  ), [state.isAuthenticated, role]);

  const [sticky, setSticky] = useState(false);

  // ✅ optimized scroll listener (throttle)
  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      if (timeout) return;

      timeout = setTimeout(() => {
        setSticky(window.scrollY > 0);
        timeout = null;
      }, 100); // throttle
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`max-w-screen-2xl container mx-auto bg-white text-black sticky top-0 left-0 right-0 z-150
      ${sticky ? "shadow-md bg-base-200 transition-all duration-300" : ""}`}
    >
      <div className="navbar md:px-20 px-4">

        {/* LEFT */}
        <div className="navbar-start">

          {/* MOBILE MENU */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-64 p-4 shadow-xl border"
            >
              {navItems}
            </ul>
          </div>

          {/* LOGO */}
          <Link
            to="/"
            className="md:text-3xl font-extrabold flex-shrink-0 bg-gradient-to-r from-primary via-orange-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition duration-300"
          >
            Highway Safary
          </Link>
        </div>

        {/* RIGHT */}
        <div className="navbar-end">

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              {navItems}
            </ul>
          </div>

          {/* AUTH BUTTON */}
          {state.isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-800 transition duration-300"
            >
              Login
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default React.memo(Navbar);