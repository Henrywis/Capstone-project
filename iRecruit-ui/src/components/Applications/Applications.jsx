import React from "react";
import "./Applications.css";

export default function Applications({ posts }) {
  return (
    <div className="applications-container">
      <div className="applications">
        <h2>Applications</h2>
        {posts.length === 0 ? (
          <p>No applications submitted.</p>
        ) : (
          <ul>
            {posts.map((application) => (
              <li key={application.id} className="application-card">
                <h3>{application.title}</h3>
                <h2>status: Submitted & Pending...</h2>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


