import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import FixedSidebar from "../FixedSidebar/FixedSidebar";
import { BsFillGrid1X2Fill, BsFillFilePersonFill, BsChatLeftTextFill, BsBuildingFillCheck } from 'react-icons/bs';

export default function Sidebar( { handleCategoryClick, userInteractions, rankedRecommendations} ) {

  const[isOpen, setIsOpen] = useState(false);
  //To set the state of the dropdown menu to be closed by default

  const handleDropDown = () =>{
    setIsOpen(!isOpen);
    //This updates the state of the dropdown when the event handledropdown is active
  };

  //state tracking the number of clicks of each category
  const [categoryClickCount, setCategoryClickCount] = useState({
    tech: 0,
    finance: 0,
    research: 0,
    design: 0,
  });

  // UseEffect to retrieve the category click count from localStorage on component mount
  useEffect(() => {
    const savedCategoryClickCount = JSON.parse(localStorage.getItem("categoryClickCount"));
    if (savedCategoryClickCount) {
      setCategoryClickCount(savedCategoryClickCount);
    }
  }, []);

  // Function to update the category click count and trigger handleCategoryClick
  const handleCategoryClickCount = (category) => {
    setCategoryClickCount((prevClickCount) => ({
      ...prevClickCount,
      [category]: prevClickCount[category] + 1,
    }));

    // Store the updated category click count in localStorage
    localStorage.setItem("categoryClickCount", JSON.stringify(categoryClickCount));
    // Call the original handleCategoryClick function
    handleCategoryClick(category);
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
                <Link to="#" onClick={() => handleCategoryClickCount("tech")}>
                  Tech
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handleCategoryClickCount("finance")}>
                  Finance
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handleCategoryClickCount("research")}>
                  Research
                </Link>
              </li>
              <li>
                <Link to="#" onClick={() => handleCategoryClickCount("design")}>
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
      <FixedSidebar userInteractions={userInteractions} rankedRecommendations={rankedRecommendations}/>
    </div>
  );
}