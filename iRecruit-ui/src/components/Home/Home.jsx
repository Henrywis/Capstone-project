import React from "react";
import "./Home.css";


export default function Home ({
    handleChange, 
    handleSubmit,
    posts,
    setPosts,
    form,
    post,
    user,
    updateUser
}) {
    return (
        <div className="home">
        <form className="new-post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
          />
          <textarea
            name="content"
            placeholder="Content"
            value={form.content}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <div className="posts-container">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <h4>
                By {post.user.username} at{" "}
                {new Date(post.createdAt).toLocaleString()}
              </h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
}