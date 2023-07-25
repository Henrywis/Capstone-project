import React, { useState, useEffect } from "react";
import "./Home.css";
import Room from "../Room/Room";

export default function Home({
  posts,
  categoryFilter,
  selectedPostId,
  setSelectedPostId,
  handleApplicationSubmit,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [hoveredPost, setHoveredPost] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselContent = [
    "Polish your Resumes for a better chance",
    "Be sure to have a setup Github account",
    "Don't forget to update your profile",
    "Kindly recommend this site to other potential users"
  ];

  // Function to handle the search input
  const handleSearch = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
  };

  // Function to filter the posts based on search and category
  useEffect(() => {
    filterPosts(posts, searchValue, categoryFilter);
  }, [posts, searchValue, categoryFilter]);

  const filterPosts = (posts, searchInput) => {
    const filteredPosts = posts.filter((post) => {
      const { title } = post;
      const searchQuery = searchInput.toLowerCase();
      return title && title.toLowerCase().includes(searchQuery);
    });

    setFilteredPosts(filteredPosts);
  };

  // Function to handle clicking on "Open Summary" button
  const handleToggleSummary = () => {
    setShowSummary((prevShowSummary) => !prevShowSummary);
  };

  // Function to handle clicking on "Start Application" button
  const handleStartApplication = (jobId) => {
    setSelectedPostId(jobId);
  };

  // Function to handle clicking on "Close Application" button
  const handleCloseApplication = () => {
    setSelectedPostId(null);
  };

  return (
    <div className="home">

      <div className="carousel-container">
        {carouselContent.map((content, index) => (
          <div
            className={`carousel-item ${index === carouselIndex ? "active" : ""}`}
            key={index}
          >
            <h2><strong>{content}</strong></h2>
          </div>
        ))}
      </div>

      <div className="search-form">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search jobs"
        />
      </div>

      <div className="posts-container">
        {filteredPosts.length === 0 ? (
          <p>No jobs found matching the search criteria.</p>
        ) : (
          filteredPosts.map((job) => (
            <div
              className="post"
              key={job.slug}
              onMouseEnter={() => setHoveredPost(job.slug)}
              onMouseLeave={() => setHoveredPost(null)}
            >
             
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p>Location: {job.location}</p>
              <p>Date Added: {job.dateAdded}</p>

              {/* show job summary when hovered and "Open Summary" button is clicked */}
              {hoveredPost === job.slug && (
                <>
                  <div className="open-summary" onClick={handleToggleSummary}>
                    {showSummary ? "Close" : "Open Summary"}
                  </div>
                  {showSummary && (
                    <div className="job-summary">
                      <p>{job.summary}</p>
                    </div>
                  )}
                </>
              )}

              {selectedPostId === job.slug ? (
                <>
                  <button onClick={handleCloseApplication}>
                    Close Application
                  </button>
                  <Room
                    jobId={selectedPostId}
                    onApplicationSubmit={handleApplicationSubmit}
                    title={job.title}
                    joburl={job.url}
                  />
                </>
              ) : (
                <button onClick={() => handleStartApplication(job.slug)}>
                  Start Application
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

