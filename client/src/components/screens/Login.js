import React, {useState} from "react";
import img from './signin-image.jpg'
import { Link } from "react-router-dom";
import history from "./history";
import M from "materialize-css";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    if ( 
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.
      test(email)){
      M.toast({ html: "Invalid Email Address", classes: "red" });
    } else {
      fetch("http://localhost:3000/Login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          email
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "red" });
          } else {
            M.toast({ html: "Logged in succesfully!! ", classes: "green" });
            history.push("/");
            window.location.reload();
          }
        });
    }
  };
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
              type="text"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="btn" onClick={() => PostData()}>
            Login
          </button>
        </div>
      </div>
      <div className="footer">
        <Link to="/SignUp">SignUp Here!</Link>
      </div>
    </div>
  );
}

export default Login
