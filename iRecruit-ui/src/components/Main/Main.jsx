import React from "react";
import "./Main.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext.js";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Profile from "../Profile/Profile";
import Feedback from "../Feedback/Feedback";
import Applications from "../Applications/Applications";
import {  Routes, Route } from "react-router-dom";

function Main() {
  //global variable that sets user to new user and re-renders components
  const { user, updateUser } = useContext(UserContext); 
  const [posts, setPosts] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState("jobs");
  //to set the state of the search query (with default search query as "jobs")

  const url = "https://jobsearch4.p.rapidapi.com/api/v1/Jobs/Search?SearchQuery=jobs";
  const [apiUrl, setApiUrl] = useState(url);
  //since there is no key called category in the API response and I can only manipulate the url for
  //the desired response, a useState to update the API url is a better option

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [submittedApplications, setSubmittedApplications] = useState([]);
  //changes the state of the Applications component based on submitted applns

  // Function to fetch additional information (location and summary) for each job
  const fetchPostsInfo = async (jobData) => {
    const postsWithInfo = await Promise.all(
      jobData.map(async (post) => {
        try {
          const response = await fetch(
            `https://jobsearch4.p.rapidapi.com/api/v1/Jobs/${post.slug}`,
            {
              method: "GET",
              headers: {
                "X-RapidAPI-Key": "ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f",
                "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
              },
            }
          );
          const data = await response.json();
          return {
            ...post,
            location: data.location,
            summary: data.summary,
          };
        } catch (error) {
          console.error("Error fetching post data:", error);
          return post;
        }
      })
    );

    setPosts(postsWithInfo);
  };
  //promise.all lets all promises be fulfilled before final function 
  //is run. in this case, fetching extra info with the slug url for each post.


  //default fetch
  useEffect(() => {
    let pageSize = 60;

    const fetchPosts = async () => {
      const response = await fetch(`${apiUrl}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f",
            "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();

      const jobData = data.data;
      // console.log(jobData);

      fetchPostsInfo(jobData); 
      // Fetch additional information for each job
    };
    fetchPosts();
  }, [apiUrl]);


  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    setApiUrl(
      `https://jobsearch4.p.rapidapi.com/api/v1/Jobs/Search?SearchQuery=${category}`
    );
    //this will take care of the url update for when any category is taken as a
    //parameter in place of "category"

    fetch(`http://localhost:3000/seed?category=${category}`, {
      method: "POST",
    });
    // Makes a request to the backend API to trigger seeding with the selected category

  };

  const handleApplicationSubmit = (application) => {
    setSubmittedApplications((prevApplications) => [
      ...prevApplications,
      application,
    ]);

    // Store the submitted applications in local storage
    localStorage.setItem("submittedApplications", JSON.stringify(submittedApplications));
  };

  const handleLogout = () => {
    //Clear user data from localStorage, reset user state
    updateUser(null);
  };

  return (
    <div className="main">
      <Navbar
        user={user}
        handleLogout={handleLogout}
        setApiUrl={setApiUrl}
        setCategoryFilter={setCategoryFilter}
        url={url}
      />
      <div className="content">
        <Sidebar handleCategoryClick={handleCategoryClick} />
        <Routes>
          <Route
            path="/*"
            element={
              <Home
                posts={posts}
                categoryFilter={categoryFilter}
                selectedPostId={selectedPostId}
                setSelectedPostId={setSelectedPostId}
                handleApplicationSubmit={handleApplicationSubmit}
              />
            }
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/contact"
            element={<Contact />}
          />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications id={selectedPostId} posts={submittedApplications} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;


