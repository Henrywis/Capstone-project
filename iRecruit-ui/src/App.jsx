import React from 'react';
import { useState, useEffect } from 'react';
import Main from './components/Main/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm/SignupForm';
import { UserContext } from './UserContext';
import './App.css';



function App() {
  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
    //retrieves the user data from storage or sets it to null if user data not found
  });

  const updateUser = (newUser) => {
    setUser(newUser)
    //updates a user and its properties (like the session, etc)
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  //this saves the user data to storage whenever the user state changes


  return (

    <div className="app">
    <UserContext.Provider value={{ user, updateUser }}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={ <Main /> } /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/*" element={user ? <Main /> : <LoginForm />} />
          {/* The route above will use the splash page blocker */}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  </div>

  );

} //bc user is a state var, once set by login, the splash page blocker line becomes true and loads Main

export default App; 