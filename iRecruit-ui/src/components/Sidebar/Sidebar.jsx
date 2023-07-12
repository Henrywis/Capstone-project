import React, { useState } from "react"
import { Link } from "react-router-dom";
import "./Sidebar.css"


export default function Sidebar() {

    const[isOpen, setIsOpen] = useState(false);
    //To set the state of the dropdown menu to be closed by default

    const handleDropDown = () =>{
        setIsOpen(!isOpen);
        //This updates the state of the dropdown when the event handledropdown is active
    }
    return (
        <div className="sidebar">
          <div className="sidebar-icons">
            <Link to="#" className="sidebar-icon" onClick={handleDropDown}>
              <i className="fas fa-th-large"></i>
              <span>Categories</span>
            </Link>
            {isOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/category/tech">Tech</Link>
                  </li>
                  <li>
                    <Link to="/category/finance">Finance</Link>
                  </li>
                  <li>
                    <Link to="/category/research">Research</Link>
                  </li>
                  <li>
                    <Link to="/category/design">Design</Link>
                  </li>
                </ul>
              </div>
            )}
    
            <Link to="/feedback" className="sidebar-icon">
              <i className="fas fa-comment-alt"></i>
              <span>Feedback</span>
            </Link>
    
            <Link to="/rooms" className="sidebar-icon">
              <i className="fas fa-door-open"></i>
              <span>Rooms</span>
            </Link>
          </div>
        </div>
      );
    }