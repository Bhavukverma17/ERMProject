// components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./Header.css";

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("currentUser");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className="app-header">
      <h1>Engineer Dashboard</h1>
      <div className="header-right">
        <div className="user-profile">
          <FaUserCircle size={28} />
          <span>{currentUser?.email}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
