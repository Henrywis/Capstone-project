import React, { useState, useEffect } from "react";
import "./Home.css";
import Room from "../Room/Room";
import Applications from "../Applications/Applications";
import Profile from "../Profile/Profile";

export default function Home({ 
  posts, 
  handleChange, 
  handleSubmit, 
  categoryFilter,
  selectedPostId,
  setSelectedPostId,
  submittedApplications,
  setSubmittedApplications,
  handleApplicationSubmit
}) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

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

    // Store the search query in local storage
    localStorage.setItem("searchQuery", searchInput);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselContent.length);
    }, 7800); // Change carousel content every 5 seconds

    return () => clearInterval(interval);
  }, []); 

  const filterPosts = (posts, searchInput, category) => {
    const filteredPosts = posts.filter((post) => {
      const { title } = post;
      const searchQuery = searchInput.toLowerCase();
      return title && title.toLowerCase().includes(searchQuery);
    });

    setFilteredPosts(filteredPosts);
  };

  useEffect(() => {
    // Function to capture the start time when the user enters a category
    const handleCategoryEnter = () => {
      localStorage.setItem("categoryEnterTime", Date.now());
    };

    // Function to calculate time spent in a category and store it in local storage
    const handleCategoryLeave = () => {
      const categoryEnterTime = localStorage.getItem("categoryEnterTime");
      const currentTime = Date.now();
      const timeSpentInCategory = currentTime - parseInt(categoryEnterTime, 10);

      // Storing the time spent in local storage
      localStorage.setItem("timeSpentInCategory", timeSpentInCategory);
    };

    // event listeners for category enter and leave
    document.addEventListener("categoryEnter", handleCategoryEnter);
    document.addEventListener("categoryLeave", handleCategoryLeave);

    return () => {
      // Then we'd remove event listeners when the component unmounts
      document.removeEventListener("categoryEnter", handleCategoryEnter);
      document.removeEventListener("categoryLeave", handleCategoryLeave);
    };
  }, []);

  const handleStartApplication = (jobId) => {
    setSelectedPostId(jobId);
  };

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
            <div className="post" key={job.slug}>
              <h2>{job.title}</h2>
              <h3>{job.company}</h3>
              <p>Date Added: {job.dateAdded}</p>
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
