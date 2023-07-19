import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
// import { FaUserCircle } from 'react-icons/fa';
import { BsFillGrid1X2Fill, BsFillFilePersonFill, BsChatLeftTextFill, BsBuildingFillCheck } from 'react-icons/bs';

export default function Sidebar( {handleCategoryClick} ) {

  const[isOpen, setIsOpen] = useState(false);
  //To set the state of the dropdown menu to be closed by default

  const handleDropDown = () =>{
    setIsOpen(!isOpen);
    //This updates the state of the dropdown when the event handledropdown is active
  };

  return (
    <div className="sidebar">
      <div className="sidebar-icons">
        <Link to="/profile" className="sidebar-icon">
          <span className="tooltip">Profile</span>
          <BsFillFilePersonFill />
        </Link>
        <Link to="#" className="sidebar-icon" onClick={handleDropDown}>
          <span className="tooltip">Categories</span>
          <BsFillGrid1X2Fill />
        </Link>
        {isOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>
                <Link to="#" onClick={() => handleCategoryClick("tech")}>
                  Tech
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handleCategoryClick("finance")}>
                  Finance
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handleCategoryClick("research")}>
                  Research
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handleCategoryClick("design")}>
                  Design
                </Link>
              </li>
            </ul>
          </div>
        )}

        <Link to="/feedback" className="sidebar-icon">
          <span className="tooltip">Feedback</span>
          <BsChatLeftTextFill />
        </Link>

        <Link to="/applications" className="sidebar-icon">
          <span className="tooltip">Applications</span>
          <BsBuildingFillCheck />
        </Link>
      </div>
    </div>
  );
}