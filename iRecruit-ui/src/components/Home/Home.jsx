import React from "react";
import "./Home.css";

export default function Home({
  posts,
}) {
  return (
    <div className="home">
      <div className="posts-container">
        {posts.map((job) => (
          <div className="post" key={job.id}>
            <h2>{job.title}</h2>
            <h3>{job.company}</h3>
            <p>Date Added: {job.dateAdded}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
