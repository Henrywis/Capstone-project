import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";



export default function Navbar({
    user,
    handleLogout
}) {
    return (
        <nav className="navbar">
            <ul className="header">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li className="user-info">
                    {user ? (
                        <>
                            <span>Hi {user.username}! |</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}