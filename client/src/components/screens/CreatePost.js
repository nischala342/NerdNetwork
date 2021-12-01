import React,{useState} from 'react'
const CreatePost = () =>{
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("") 

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
        <button type="button" className="btn">
          Upload Post
        </button>
      </div>
    );
}

export default CreatePost