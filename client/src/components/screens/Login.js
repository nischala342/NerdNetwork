import React from "react";
import img from './signin-image.jpg'
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={img} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn">
          Login
        </button>
        <br />
        <Link to="/SignUp">SignUp Here!</Link>
      </div>
    </div>
  );
}

export default Login
