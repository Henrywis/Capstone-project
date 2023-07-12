import "./Main.css"
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext.js";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import About from "../About/About";
import Contact from "../Contact/Contact";
import { Routes, Route } from "react-router-dom";

function Main() {
  //global variable that sets user to new user and re-renders components
  const { user, updateUser } = useContext(UserContext); 

  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: '',
    content: '',
    credentials: 'include'
  });

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        "https://jobsearch4.p.rapidapi.com/api/v1/Jobs/Search?SearchQuery=jobs",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "ec112ef3bcmshaa8e131d16aa03ep1e5eaejsnc56cb89a889f",
            "X-RapidAPI-Host": "jobsearch4.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setPosts(data.data);
    };
    fetchPosts();
  }, []);

  //This form updater updates the input
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      //and then include credentials to remember the user and its session state
      credentials: 'include'  
    });
    const newPost = await response.json();
    setPosts([newPost, ...posts]);
  };
  const handleLogout = () => {
    // Perform logout logic here
    // Example: Clear user data from localStorage, reset user state, etc.
    updateUser(null);
  };

  return (
    <div className="main">
      <Navbar
        user={user}
        handleLogout={handleLogout}
      />
      <div className="content">
        <Sidebar />
        <Routes>
          <Route
            path="/*"
            element={
              <Home
                form={form}
                posts={posts}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setPosts={setPosts}
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
        </Routes>
      </div>
    </div>
  );
}

export default Main;