import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import history from "./history";
import M from "materialize-css";
const CreatePost = () =>{
  //const history = useHistory();
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("") 
  const [url,setUrl] = useState("")
  useEffect(() =>{
    if(url){
      fetch("http://localhost:3000/CreatePost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          //console.log(data);
          if (data.error) {
            M.toast({ html: data.error, classes: "red" });
          } else {
            M.toast({ html: "Post Created", classes: "green" });
            history.push("/");
            window.location.reload();
          }
        });
 
    }
  },[url])
  const postDetails = () =>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","social")
    data.append("cloud_name", "dvyahklcf");
    fetch("https://api.cloudinary.com/v1_1/dvyahklcf/image/upload",{
    method : "post",
    body:data
    })
    .then(res=>res.json())
    .then(data =>{
      setUrl(data.url)
    })
    .catch(err =>{
      console.log(err)
    })
  }
    return (
      <div
        className="card input-filed"
        style={{
          margin: "30px auto",
          maxWidth: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div class="file-field input-field">
          <div class="btn">
            <span>Upload Image</span>
            <input
             type="file" 
             onChange= {(e) => setImage(e.target.files[0])}/>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <button type="button" className="btn" onClick={() => postDetails()}>
          Upload Post
        </button>
      </div>
    );
}

export default CreatePost