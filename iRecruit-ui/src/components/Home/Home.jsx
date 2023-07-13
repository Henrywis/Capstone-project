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


// import React, { useState } from "react";
// import "./Home.css";

// export default function Home({ posts, handleChange, handleSubmit }) {
//   const [searchValue, setSearchValue] = useState("");
//   const [filteredPosts, setFilteredPosts] = useState(posts);

//   const handleSearch = (event) => {
//     const searchInput = event.target.value;
//     setSearchValue(searchInput);

//     const filteredPosts = posts.filter((post) => {
//       const { title, category } = post;
//       const searchQuery = searchInput.toLowerCase();
//       const categoryQuery = category.toLowerCase();
//       return (
//         (title && title.toLowerCase().includes(searchQuery)) ||
//         (category && categoryQuery === "jobs") ||
//         (category && categoryQuery.includes(searchQuery))
//       );
//     });

//     setFilteredPosts(filteredPosts);
//   };

//   return (
//     <div className="home">
//       <div className="search-form">
//         <input
//           type="text"
//           value={searchValue}
//           onChange={handleSearch}
//           placeholder="Search..."
//         />
//       </div>
//       <div className="posts-container">
//         {filteredPosts.length === 0 ? (
//           <p>No jobs found matching the search criteria.</p>
//         ) : (
//           filteredPosts.map((job) => (
//             <div className="post" key={job.id}>
//               <h2>{job.title}</h2>
//               <h3>{job.company}</h3>
//               <p>Date Added: {job.dateAdded}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
