import React from "react";
import img from "./signin-image.jpg";
import "./style.scss"
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import M from 'materialize-css';
import history from './history';
import { createBrowserHistory } from "history";
const SignUp = () => {
  const [name,setName] = useState("")
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(() =>{
    if(url){
      uploadFields()
    }
  },[url])
  const uploadPic = () =>{
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "social");
    data.append("cloud_name", "dvyahklcf");
    fetch("https://api.cloudinary.com/v1_1/dvyahklcf/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const uploadFields = () =>{
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        M.toast({ html: "Invalid Email Address", classes: "red" });
      } else {
        fetch("http://localhost:3000/SignUp", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            password,
            email,
            pic: url
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              M.toast({ html: data.error, classes: "red" });
            } else {
              M.toast({ html: data.message, classes: "green" });
              history.push("/Login");
              window.location.reload();
            }
          });
      }
  }
  const PostData = () =>{
    if(image){
      uploadPic()
    }
    else{
        uploadFields()
    }
    
  }
  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={img} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="file-field input-field">
            <div class="btn">
              <span>Upload Profile Picture</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
          <button type="button" className="btn" onClick={() => PostData()}>
            Register
          </button>
        </div>
      </div>
      <div className="footer">
        <Link to="/Login">Login Here!</Link>
      </div>
    </div>
  );
};

export default SignUp;
