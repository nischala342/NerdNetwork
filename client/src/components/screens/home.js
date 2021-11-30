import React from 'react' 
import img from './signin-image.jpg'
const Home  = () =>{
    return (
      <div className="home">
        <div className="card home-card">
          <h5>Name</h5>
          <div className="card-image">
            <img src="https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
          </div>
          <i className='material-icons' style={{color:'black'}}>thumb_up</i>
          <h6>Title</h6>
          <p>Description</p>
          <input type="text" placeholder = "add a comment"/>
        </div>
      </div>
    );
}

export default Home 