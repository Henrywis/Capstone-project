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

  // useEffect(() => {

  //   let pageSize = 60;
  //   // Function to fetch data from cache or API
  //   const fetchData = async () => {
  //     const cacheUrl = 'http://localhost:3000/cache/posts';
  //     try {
  //       const response = await fetch(cacheUrl);
  
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  
  //       const dataObject = await response.json();
  //       ////////////////////////////////////////
  //       console.log('Data from cache:', dataObject); 
  //       ///////////////////////////////////////////

  //       //cache eviction
  //       if (Array.isArray(dataObject.value) && dataObject.value.length > 0) { // Check if data is an array
  //         const currentTime = new Date().getTime();
  //         const cachedData = dataObject.value.filter((entry) => entry.expiresAt > currentTime);
  
  //         // If data is found in the cache, use it
  //         if (cachedData.length > 0) {
  //           setPosts(cachedData.map((entry) => entry.data));
  //           //extracts array of data values for each cached object
  //           setLoading(false);
  //         } else {
  //           // If there's no data in the cache, fetch from API and store in cache
  //           setLoading(true);
  //           const apiResponse = await fetch(`${apiUrl}&pageSize=${pageSize}`, {
  //             headers: {
  //               "X-RapidAPI-Key": "ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f",
  //               "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
  //             },
  //           });
  //           const responseData = await apiResponse.json();
  //           const jobData = responseData.data;
  //           setPosts(jobData);
  //           // setLoading(false);

  //           // Store data in cache
  //           await fetch(cacheUrl, {
  //             method: 'POST',
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify(jobData),
  //           });

  //           const postsWithInfo = await Promise.all(
  //             jobData.map(async (post) => {
  //               try {
  //                 // setLoading(true);
  //                 const response = await fetch(
  //                   `https://jobsearch4.p.rapidapi.com/api/v1/Jobs/${post.slug}`,
  //                   {
  //                     method: "GET",
  //                     headers: {
  //                       "X-RapidAPI-Key": "ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f",
  //                       "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
  //                     },
  //                   }
  //                 );
  //                 const data = await response.json();

  //                 return {
  //                   ...post,
  //                   location: data.location,
  //                   summary: data.summary,
  //                 };


  //               } catch (error) {
  //                 console.error("Error fetching post data:", error);
  //                 return post;
  //               }
  //             })
  //           );

  //           // Set the posts state with the additional information (location and summary)
  //           setPosts(postsWithInfo);
  //           setLoading(false);
  //         }
  //       } else{
  //         console.error('Data is not in the expected format:', dataObject);
  //       }
        
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       // setLoading(false);
  //     }
  //   };
  
  //   fetchData();
    
  //   //this cleans up function to evict stale data from cache after 30 seconds(to test)
  //   const cacheCleanupInterval = setInterval(() => {
  //     const currentTime = new Date().getTime();
  //     const validData = cachedData.filter((entry) => entry.expiresAt > currentTime);
  //     if (validData.length !== cachedData.length) {
  //       // Some data has expired, evict stale data
  //       console.log('Evicted data:', cachedData.filter((entry) => entry.expiresAt <= currentTime));
  //       setPosts(validData.map((entry) => entry.data));
  //     }
  //   }, THIRTY_SECONDS);
  
  //   // Clear the interval when the component unmounts to avoid memory leaks
  //   return () => clearInterval(cacheCleanupInterval);

  // }, [apiUrl, preferredPostsCount]);



  useEffect(() => {
    let pageSize = 60;

    // Function to fetch data from cache or API
    const fetchData = async () => {
      const cacheUrl = 'http://localhost:3000/cache/posts';
      try {
        const response = await fetch(cacheUrl);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const cacheData = await response.json();

        // Cache eviction
        const currentTime = new Date().getTime();
        const validData = cacheData.filter((entry) => entry.expiresAt > currentTime);

        // If valid data is found in the cache, use it
        if (validData.length > 0) {
          setPosts(validData.map((entry) => entry.data));
          setLoading(false);
        } else {
          // If there's no valid data in the cache, fetch from API and store in cache
          setLoading(true);
          const apiResponse = await fetch(`${apiUrl}&pageSize=${pageSize}`, {
            headers: {
              "X-RapidAPI-Key": "ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f",
              "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
            },
          });
          const responseData = await apiResponse.json();
          const jobData = responseData.data;
          setPosts(jobData);
          setLoading(false);

          // Get additional info for jobData (location and summary)
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

          // Store data with additional info in cache
          const cacheData = postsWithInfo.map((post) => ({
            data: post,
            expiresAt: new Date().getTime() + THIRTY_SECONDS,
          }));
          await fetch(cacheUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cacheData),
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Cache cleanup function to evict stale data from cache after 30 seconds
    const cacheCleanupInterval = setInterval(async () => {
      try {
        const cacheResponse = await fetch(cacheUrl);
        if (!cacheResponse.ok) {
          throw new Error('Network response for cache was not ok');
        }
        const cacheData = await cacheResponse.json();
        const currentTime = new Date().getTime();
        const validData = cacheData.filter((entry) => entry.expiresAt > currentTime);
        if (validData.length !== cacheData.length) {
          // Some data has expired, evict stale data
          console.log('Evicted data:', cacheData.filter((entry) => entry.expiresAt <= currentTime));
          // this log should show the evicted data
          await fetch(cacheUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(validData),
          });
        }
      } catch (error) {
        console.error('Error fetching cache data:', error);
      }
    }, THIRTY_SECONDS);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(cacheCleanupInterval);

  }, [apiUrl, preferredPostsCount]);


  useEffect(() => {
    // effect for updating recommendations whenever the preferredPosts count changes
    const buildRankedRecommendations = async () => {
      if (preferredPostsCount >= 3) {
        const rankedJobPosts = await buildRankingModel(posts, userInteractions.preferredPosts);
        setRankedRecommendations(rankedJobPosts);
        setRecommendedPosts(rankedJobPosts.slice(0, 5));
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
