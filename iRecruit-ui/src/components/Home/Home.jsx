import React, { useState, useEffect } from "react";
import "./Home.css";
import Room from "../Room/Room";
import { TbLoaderQuarter } from "react-icons/tb";

export default function Home({
  posts,
  categoryFilter,
  selectedPostId,
  setSelectedPostId,
  handleApplicationSubmit,
  loading,
  likedPosts,
  dislikedPosts,
  handleLike,
  handleDislike,
  handleStartApplication,
  flippedPostId,
  setFlippedPostId
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

  useEffect(() => {
    filterPosts(posts, searchValue, categoryFilter);
  }, [posts, searchValue, categoryFilter]);

  const handleSearch = (event) => {
    const searchInput = event.target.value;
    setSearchValue(searchInput);
  };

  useEffect(() => {
    const CAROUSEL_FADE_TIMEOUT = 7.8 * 1000;
    //7.8 seconds
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselContent.length);
    }, CAROUSEL_FADE_TIMEOUT);

    return () => clearInterval(interval);
  }, []); 

  // Function to filter the posts based on search and category
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

  // Function to handle clicking on "Close Application" button
  const handleCloseApplication = () => {
    setSelectedPostId(null);
    setFlippedPostId(null);
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

      {loading ? (
        <div className="loading-spinner">
          <TbLoaderQuarter
            className="spinner-icon"
            size={45}
            color="blue"
            />
        </div>
      ) : (
        <div className="posts-container">
          {filteredPosts.length === 0 ? (
            <p>No jobs found matching the search criteria.</p>
          ) : (
            filteredPosts.map((job) => (
              <div
                className={`post ${flippedPostId === job.slug ? "flipped" : ""}`}
                key={job.slug}
                onMouseEnter={() => setHoveredPost(job.slug)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className="front-content">
                  {/* particular job info*/}

                  <h2>{job.title}</h2>
                  <h3>{job.company}</h3>
                  <p>Location: {job.location}</p>
                  <p>Date Added: {job.dateAdded}</p>


                  {/* shows job summary when hovered and "Open Summary" button is clicked */}
                  {hoveredPost === job.slug && (
                    <>
                      <div className="open-summary" onClick={handleToggleSummary}>
                        {showSummary ? "Close" : "Open Summary"}
                      </div>
                      {showSummary && (
                        <div className="job-summary">
                          <div className="summary-info">
                            <p>{job.summary}</p>
                          </div>
                          <div className="like-dislike-buttons">
                            <button className={likedPosts.some((post) => post.slug === job.slug) ? "liked" : ""} onClick={() => handleLike(job)}>Like</button>
                            <button className={dislikedPosts.some((post) => post.slug === job.slug) ? "disliked" : ""} onClick={() => handleDislike(job)}>Dislike</button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {selectedPostId === job.slug ? (
                    <button onClick={handleCloseApplication}>
                      Close Application
                    </button>
                  ) : (
                    <button onClick={() => handleStartApplication(job.slug)}>
                      Start Application
                    </button>
                  )}
                </div>
                {selectedPostId === job.slug && (
                  <div className="back-content">
                    <Room
                      jobId={selectedPostId}
                      onApplicationSubmit={handleApplicationSubmit}
                      title={job.title}
                      joburl={job.url}
                    />
                    <button className="close-application-button" onClick={handleCloseApplication}>
                      Close Application
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
