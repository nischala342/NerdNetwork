import React from 'react' 
import {Link } from 'react-router-dom'
const NavBar = () =>{
    return (
      <nav>
        <div className="nav-wrapper white">
          <ul id="nav-mobile" className="right">
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/SignUp">SignUp</Link>
            </li>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/CreatePost">Create Post</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default NavBar 