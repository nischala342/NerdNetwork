import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
const Profile = () => {
  //const [mypics, setPics] = useState([]); 
  const [userProfile, setProfile] = useState(null); 
  const { state, dispatch } = useContext(UserContext);
  const {userid} = useParams()
  console.log(userid)
  useEffect(() => {
    fetch("/user/${userid}", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        //setPics(result.mypost);
        setProfile(result)
      });
  }, []); 
  return (
    <>
    {userProfile ? 
    
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <img
              src="https://static.remove.bg/remove-bg-web/a76316286d09b12be1ebda3b400e3f44716c24d0/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg"
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            />
          </div>
          <div>
            
            <h4>{userProfile.user.name}</h4>
            <h5>{userProfile.user.email}</h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>{userProfile.posts}</h6>
              <h6>followers</h6>
              <h6>following</h6>
            </div>
          </div>
        </div>

        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div className="btn #64b5f6 blue darken-1">
            <span>Update pic</span>
            <input type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
      </div>
      <div className="gallery">
        {
        userProfile.posts.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
              style={{ width: "160px", height: "160px" }}
            />
          );
        })}
      </div>
    </div>
    
    
    : <h2>loading.....</h2>}
    
    </>
  );
};

export default Profile;
