import React from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/screens/home'
import Profile from "./components/screens/profile";
import Login from "./components/screens/Login";
import SignUp from "./components/screens/SignUp";
import CreatePost from "./components/screens/CreatePost";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/CreatePost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
