import React from "react";
import "./Feedback.css";

const Feedback = ({ likedPosts, dislikedPosts, preferredPosts }) => {
  return (
    <div className="feedback">
      <div className="feedback-container">
        <div className="feedback-box">
          <div className="box-title">
            <h2>Likes</h2>
          </div>
          <div className="feedback-list">
            <ul>
              {likedPosts.map((post) => (
                <li key={post.slug}>
                  <strong>{post.title}</strong> - {post.location}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="feedback-box">
          <div className="box-title">
            <h2>Dislikes</h2>
          </div>
          <div className="feedback-list">
            <ul>
              {dislikedPosts.map((post) => (
                <li key={post.slug}>
                  <strong>{post.title}</strong> - {post.location}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="feedback-box">
          <div className="box-title">
            <h2>Preferred</h2>
          </div>
          <div className="feedback-list">
            <ul>
              {preferredPosts.map((post) => (
                <li key={post.slug}>
                  <strong>{post.title}</strong> - {post.location}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
