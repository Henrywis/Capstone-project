import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { BsHouseFill, BsInfoCircleFill, BsTelephoneInboundFill } from 'react-icons/bs';

export default function Navbar({
  user,
  handleLogout,
  setCategoryFilter,
  setApiUrl,
  url
}) {
  const handleHomeClick = () => {
    setCategoryFilter("jobs");
    setApiUrl(url);
  };

  return (
    <nav className="navbar">
      <div className="header-container">
        <ul className="header">
          <li>
            <Link to="/" onClick={handleHomeClick}>
              <span className="tooltip">Home</span>
              <BsHouseFill />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <span className="tooltip">About</span>
              <BsInfoCircleFill />
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <span className="tooltip">Contact</span>
              <BsTelephoneInboundFill />
            </Link>
          </li>
          <li className="user-info">
            {user ? (
              <>
                <span>Hi {user.username}! </span>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}