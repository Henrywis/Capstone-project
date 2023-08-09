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
import { v4 as uuidv4 } from 'uuid';
import { buildRankingModel } from "../data";


function Main() {
  //global variable that sets user to new user and re-renders components
  const THIRTY_SECONDS = 30 * 1000;
  //30 seconds in millisec for cache
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

  const [flippedPostId, setFlippedPostId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const [preferredPosts, setPreferredPosts] = useState([]);

  const [userInteractions, setUserInteractions] = useState({
    likedPosts: [],
    dislikedPosts: [],
    preferredPosts: [],
  });

  const [preferredPostsCount, setPreferredPostsCount] = useState(0);
  //////
  const [rankedRecommendations, setRankedRecommendations] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  ///////

  useEffect(() => {
    let pageSize = 60;
  
    // Function to fetch data from cache or API
    const fetchData = async () => {
      const cacheUrl = "http://localhost:3000/cache/posts";
      try {
        const response = await fetch(cacheUrl);
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const cacheData = await response.json();
        const currentTime = new Date().getTime();
  
        let postsWithId = [];
        if (Array.isArray(cacheData) && cacheData.length > 0) {
          const cachedEntry = cacheData[0];
          if (cachedEntry.expiresAt > currentTime) {
            setPosts(cachedEntry.data.slice(0, pageSize));
            setLoading(false);
          } else {
            setLoading(true);
            const apiResponse = await fetch(`${apiUrl}&pageSize=${pageSize}`, {
              headers: {
                "X-RapidAPI-Key": "ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f",
                "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
              },
            });
            const responseData = await apiResponse.json();
            const jobData = responseData.data;
            postsWithId = jobData.map((post) => ({ ...post, id: uuidv4() }));
            //giving each post a unique id using id generator which is more convenient than post.slug 
            setPosts(postsWithId.slice(0, pageSize));
            setLoading(false);
  
            if (postsWithId.length >= 3) {
              const rankedJobPosts = await buildRankingModel(postsWithId, []);
              setRecommendedPosts(rankedJobPosts.slice(0, 5));
            }
          }
        } else {
          // If the cache is empty or not in the expected format, fetch from API directly
          setLoading(true);
          const apiResponse = await fetch(`${apiUrl}&pageSize=${pageSize}`, {
            headers: {
              "X-RapidAPI-Key": "ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f",
              "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
            },
          });
          const responseData = await apiResponse.json();
          const jobData = responseData.data;
          postsWithId = jobData.map((post) => ({ ...post, id: uuidv4() }));
          setPosts(postsWithId.slice(0, pageSize));
          setLoading(false);
  
          if (postsWithId.length >= 3) {
            const rankedJobPosts = await buildRankingModel(postsWithId, []);
            setRecommendedPosts(rankedJobPosts.slice(0, 5));
          }
        }
  
        // Fetch additional info for each post separately, mapping them into the posts
        //note: some posts have undefined slugs and some have undefined slug info
        //for instance some posts have no location, and/or summary
        const additionalInfoPromises = postsWithId.map(async (post) => {
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
        });
  
        const postsWithInfo = await Promise.all(additionalInfoPromises);
  
        // Cache data in chunks with expiration time
        // Here I am paginating the cache with 10 posts per
        // cache to avoid payload, they all have the same expiry
        const expirationTime = new Date().getTime() + THIRTY_SECONDS;
        const chunkSize = 10; // number of posts per cache page
        for (let i = 0; i < postsWithInfo.length; i += chunkSize) {
          const chunk = postsWithInfo.slice(i, i + chunkSize);
          const dataWithInfoToCache = [
            {
              data: chunk,
              expiresAt: expirationTime,
            },
          ];
          await fetch(cacheUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataWithInfoToCache),
          });
        }
  
        // Update state with posts containing additional information
        setPosts(postsWithInfo.slice(0, pageSize));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
    // Cache cleanup to evict stale data after 30 seconds (for testing)
    const cacheCleanupInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const validData = posts.filter((entry) => entry.expiresAt > currentTime);
      if (validData.length !== posts.length) {
        // Some data has expired, evict stale data
        console.log(
          "Evicted data:",
          posts.filter((entry) => entry.expiresAt <= currentTime)
        );
        setPosts(validData);
      }
    }, THIRTY_SECONDS);
  
    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(cacheCleanupInterval);
  }, [apiUrl]);
 

  useEffect(() => {
    // effect for updating recommendations whenever the preferredPosts count changes
    const buildRankedRecommendations = async () => {
      if (preferredPostsCount >= 3) {
        const rankedJobPosts = await buildRankingModel(posts, userInteractions.preferredPosts);
        setRankedRecommendations(rankedJobPosts);
        setRecommendedPosts(rankedJobPosts.slice(0, 5)); 
        // after 3 interactions from the user specifically to add posts to their
        // preferred posts (by starting an application), build recommendations and
        // slice results to get the top 5 ranked posts based on cosine similarities of
        // user interactions and the job posts' TF-IDF values in descending order 
        // the order is sorted in the buildRankingModel function
        console.log(rankedJobPosts);
      } else {
        setRankedRecommendations([]);
        setRecommendedPosts([]);
      }
    };
    buildRankedRecommendations();
  }, [preferredPostsCount, posts, userInteractions.preferredPosts]);
  

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

  // Function to handle clicking on "Start Application" button and mark post as preferred //
  const handleStartApplication = (jobId) => {
    setSelectedPostId(jobId);
    setFlippedPostId(jobId);

    const preferredPost = posts.find((post) => post.slug === jobId);
    if (preferredPost) {
      setUserInteractions((prevInteractions) => ({
        ...prevInteractions,
        preferredPosts: [...prevInteractions.preferredPosts, preferredPost],
      }));
      setPreferredPostsCount((count) => count + 1);
    }
  };

  // Function to handle clicking on "Like" button
  const handleLike = (job) => {
    setLikedPosts((prevLikedPosts) => [...prevLikedPosts, job]);

    setUserInteractions((prevInteractions) => ({
      ...prevInteractions,
      likedPosts: [...prevInteractions.likedPosts, job],
    }));
  };

  // Function to handle clicking on "Dislike" button
  const handleDislike = (job) => {
    setDislikedPosts((prevDislikedPosts) => [...prevDislikedPosts, job]);

    setUserInteractions((prevInteractions) => ({
      ...prevInteractions,
      dislikedPosts: [...prevInteractions.dislikedPosts, job],
    }));
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

  //DATA GATHERING STAGES FOR RANKING

  // Function to generate a unique identifier for the user
  const generateUserId = () => {
    return uuidv4();
  };

  useEffect(() => {
    // Generate a unique identifier for the user (if not already present)
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = generateUserId();
      localStorage.setItem('userId', userId);
    }
  }, []);

  // Function to handle user interactions (likes, dislikes, and preferred posts)
  const handleUserInteractions = () => {
    const userLikes = userInteractions.likedPosts.map((post) => post.slug);
    const userDislikes = userInteractions.dislikedPosts.map((post) => post.slug);
    const userPreferred = userInteractions.preferredPosts.map((post) => post.slug);

    const userInteractionsData = {
      likes: userLikes,
      dislikes: userDislikes,
      preferred: userPreferred,
    };

    // console.log("User Interactions Data:", userInteractionsData);

    // Store user interactions in localStorage
    localStorage.setItem("userInteractionsData", JSON.stringify(userInteractionsData));

    // Create and store user profile in localStorage
    const userProfile = {
      id: localStorage.getItem('userId'),
      likedPosts: userLikes,
      dislikedPosts: userDislikes,
      preferredPosts: userPreferred,
    };

    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  };

  // Call the handleUserInteractions function whenever userInteractions state changes
  useEffect(() => {
    handleUserInteractions();
  }, [userInteractions]);


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
        <Sidebar 
        handleCategoryClick={handleCategoryClick}
        userInteractions={userInteractions}
        rankedRecommendations={recommendedPosts}
        />
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
                loading={loading}
                likedPosts={likedPosts}
                handleLike={handleLike}
                handleDislike={handleDislike}
                dislikedPosts={dislikedPosts}
                preferredPosts={preferredPosts}
                handleStartApplication={handleStartApplication}
                flippedPostId={flippedPostId}
                setFlippedPostId={setFlippedPostId}
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
          <Route path="/feedback" element={<Feedback userInteractions={userInteractions}/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications id={selectedPostId} posts={submittedApplications} />} />
        </Routes>
      </div>
    </div>
  );
}

export default Main;
