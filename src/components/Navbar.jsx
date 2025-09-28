import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
      <div className="container navbar-container">

        <h1 className="logo">Service Manager</h1>
        {/* Desktop menu */}
        <ul className="nav-links desktop-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        {/* Hamburger Button */}
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* Sidebar Menu */}
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={toggleMenu}>×</button>
          <ul>
            <li onClick={toggleMenu}><Link to="/">Home</Link></li>
            <li onClick={toggleMenu}><Link to="/services">Services</Link></li>
            <li onClick={toggleMenu}><Link to="/blog">Blog</Link></li>
            <li onClick={toggleMenu}><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        {/* Overlay */}
        {isOpen && <div className="overlay" onClick={toggleMenu}></div>}

      </div>
    </nav>
  );
}
