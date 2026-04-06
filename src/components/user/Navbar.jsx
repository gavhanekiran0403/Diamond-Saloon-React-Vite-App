import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./navbar.css";
import { logoutUser } from "../../services/AuthService";

const Login = lazy(() => import("../../pages/user/Login"));

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("loggedUser");
      if (stored) {
        const user = JSON.parse(stored);
        console.log("Loaded user:", user);
        setLoggedUser(user);
      }
    } catch (err) {
      console.error("Invalid storage data:", err);
      localStorage.removeItem("loggedUser");
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = (user) => {
    setLoggedUser(user);
    setShowLogin(false);

    if (user.role === "ADMIN") {
      navigate("/admin/dashboard");
    } else {
      navigate("/home");
    }
  };

  const handleLogout = async () => {
    try {
      const stored = localStorage.getItem("loggedUser");

      if (!stored) {
        console.error("No user found");
        return;
      }

      const user = JSON.parse(stored);
      console.log("Logout user:", user);

      if (user.id) {
        await logoutUser(user.id);
      } else {
        console.error("User ID missing:", user);
      }

      localStorage.removeItem("loggedUser");
      setLoggedUser(null);
      setDropdownOpen(false);

      navigate("/home");

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">Diamond Solution</div>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {/* 🔔 Notification Bell */}
          {loggedUser && (
            <li
              style={{ cursor: "pointer", fontSize: "20px" }}
              onClick={() => navigate("/notifications")}
            >
              <FaBell />
            </li>
          )}

          {!loggedUser ? (
            <li>
              <button
                className="login-btn"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            </li>
          ) : (
            <li className="profile-section" ref={dropdownRef}>
              <div
                className="profile-name"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                👤 {loggedUser?.fullName} ▾
              </div>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/MyAppointment">My Appointment</Link>
                  <Link to="/cart">Add To Cart</Link>
                  <Link to="/MyOrders">My Orders</Link>

                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </li>
          )}
        </ul>
      </nav>

      {/* 🔹 Lazy Login Modal */}
      {showLogin && !loggedUser && (
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Login
            onLogin={handleLogin}
            onClose={() => setShowLogin(false)}
          />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;