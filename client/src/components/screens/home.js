import React,{useState,useEffect, useContext} from 'react' 
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'
import img from './signin-image.jpg'

const Home  = () =>{
  const [data,setData] = useState([])  
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    fetch("/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        setData(result.posts);
      });
  },[])

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
      <div className="home">
        {
          data.map(item=>{
            return (
              <div className="card home-card" key={item._id}>
                  <img
                    src={item.postedBy.pic}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "40px",
                    }}
                  />
                
                <h5 style={{ padding: "5px" }}>
                  <Link
                    to={
                      item.postedBy._id !== state._id
                        ? "/profile/" + item.postedBy._id
                        : "/profile"
                    }
                  >
                    {item.postedBy.name}
                  </Link>{" "}
                  {item.postedBy._id == state._id && (
                    <i
                      className="material-icons"
                      style={{
                        float: "right",
                      }}
                      onClick={() => deletePost(item._id)}
                    >
                      delete
                    </i>
                  )}
                </h5>
                {!item.photo.includes("No Pic") ? (
                  <div className="card-image">
                    <img src={item.photo} />
                  </div>
                ) : (
                  <h1></h1>
                )}

                <h6>{item.title}</h6>
                <p>{item.body}</p>
                {item.likes.includes(state._id) ? (
                  <i
                    className="material-icons"
                    onClick={() => {
                      unlikePost(item._id);
                    }}
                    style={{ color: "blue" }}
                  >
                    thumb_up
                  </i>
                ) : (
                  <i
                    className="material-icons"
                    onClick={() => {
                      likePost(item._id);
                    }}
                    style={{ color: "black" }}
                  >
                    thumb_up
                  </i>
                )}
                <h6>{item.likes.length}likes</h6>
                {item.comments.map((record) => {
                  return (
                    <h6 key={record._id}>
                      <span style={{ fontWeight: "500" }}>
                          <img
                            src={record.postedBy.pic}
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "30px",
                            }}
                          />
                        <b>  {record.postedBy.name}</b>
                      </span>{"  "}
                      <i>  {record.text}</i>
                    </h6>
                  );
                })}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    makeComment(e.target[0].value, item._id);
                  }}
                >
                  <input type="text" placeholder="add a comment" />
                </form>
              </div>
            );
          })
        }
        </div>
    )
    
}

export default Home 