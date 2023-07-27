import React from "react";
import './Feedback.css';

const Feedback = ({ userInteractions }) => {
  return (
    <div className="feedback">
      <h2>User Interactions</h2>
      <div>
        <h3>Liked Posts:</h3>
        <ul>
          {userInteractions.likedPosts.map((post) => (
            <li key={post.slug}>{post.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Disliked Posts:</h3>
        <ul>
          {userInteractions.dislikedPosts.map((post) => (
            <li key={post.slug}>{post.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Preferred Posts:</h3>
        <ul>
          {userInteractions.preferredPosts.map((post) => (
            <li key={post.slug}>{post.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Feedback;

