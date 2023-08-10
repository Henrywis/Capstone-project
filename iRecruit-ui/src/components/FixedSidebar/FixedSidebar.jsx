import React, { useEffect, useState } from "react";
import "./FixedSidebar.css";

const FixedSidebar = ({ userInteractions, rankedRecommendations, submissions }) => {
  // Random data for the bar chart for app status to test the UI
  const shortlistedCount = 5;
   //hardcoded for now
  const pendingCount = submissions.length; 
  // all submissions will be pending until shortlisted or rejected
  const rejectedCount = 2;    
  //hardcoded for now

  return (
    <div className="fixed-sidebar">
      <div className="sidebar-container">
        <div className="sidebar-box">
          <div className="box-title">
            <h2>Application status</h2>
          </div>
          <div className="sidebar-box1">
            {/* Part 1: Status */}
            <div className="status-container">
              <div className="status-item">
                <span>Shortlisted</span>
                <div className="status-box green"></div>
              </div>
              <div className="status-item">
                <span>Pending</span>
                <div className="status-box amber"></div>
              </div>
              <div className="status-item">
                <span>Rejected</span>
                <div className="status-box red"></div>
              </div>
            </div>

            {/* Part 2: Bar Chart */}
            <div className="bar-chart">
              <div className="bar green" style={{ width: `${shortlistedCount}%` }}>
                {shortlistedCount}
              </div>
              <div className="bar amber" style={{ width: `${pendingCount}%` }}>
                {pendingCount}
              </div>
              <div className="bar red" style={{ width: `${rejectedCount}%` }}>
                {rejectedCount}
              </div>
            </div>
          </div>
        </div>
        <div className="sidebar-box">
          <div className="box-title">
            <h2>Recommendations</h2>
          </div>
          <div className="sidebar-box2">
            {userInteractions.preferredPosts.length >= 3 ? (
              <>
                <strong>JOBS YOU MAY LIKE: </strong>
                {rankedRecommendations.map((post, index) => (
                  <li key={index}>
                    <strong>{post.title}</strong>
                    <p>{post.location}</p>
                  </li>
                ))}
              </>
            ) : (
              <p>Loading Suggestions...</p>
            )}
          </div>
        </div>
        <div className="sidebar-box">
          <div className="sidebar-box3">
            <strong>Search these recommendations to start applying</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixedSidebar;

