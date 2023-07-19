// import React from "react";
// import "./Home.css";

// export default function Home({
//   posts,
// }) {
//   return (
//     <div className="home">
//       <div className="posts-container">
//         {posts.map((job) => (
//           <div className="post" key={job.id}>
//             <h2>{job.title}</h2>
//             <h3>{job.company}</h3>
//             <p>Date Added: {job.dateAdded}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./Home.css";

export default function Home({ posts, handleChange, handleSubmit, categoryFilter }) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    filterPosts(posts, searchValue, categoryFilter);
  }, [posts, searchValue, categoryFilter]);

  const handleSearch = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
  };

  const filterPosts = (posts, searchInput, category) => {
    const filteredPosts = posts.filter((post) => {
      const { title } = post;
      const searchQuery = searchInput.toLowerCase();

      if (category === "jobs") {
        return title && title.toLowerCase().includes(searchQuery);
      } else {
        return title && title.toLowerCase().includes(searchQuery);
      }
    });

    setFilteredPosts(filteredPosts);
  };

  return (
    <div className="home">
      <div className="search-form">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search..."
        />
      </div>
      <div className="posts-container">
        {filteredPosts.length === 0 ? (
          <p>No jobs found matching the search criteria.</p>
        ) : (
          filteredPosts.map((job) => (
            <div className="post" key={job.id}>
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p>Date Added: {job.dateAdded}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
