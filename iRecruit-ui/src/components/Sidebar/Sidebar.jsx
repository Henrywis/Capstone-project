import React from "react"
import { Link } from "react-router-dom";
import "./Sidebar.css"


export default function Sidebar () {
    return (
        <div className="sidebar">
        <ul>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
        </ul>
      </div>
    )
}



