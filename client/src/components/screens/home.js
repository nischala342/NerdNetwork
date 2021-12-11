import React,{useState,useEffect} from 'react' 
import { UserContext } from '../../App'
import {Link} from 'react-router-dom'
import img from './signin-image.jpg'
const Home  = () =>{
  const [data,setData] = useState([])  
  useEffect(()=>{
    fetch('/allposts',{
      headers:{
        "Authorization":"Bearer " +localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
       .then(result=>{
      //console.log(result)
      setData(result.posts)
    })
  },[])
  return (
      <div className="home">
        {
          data.map(item=>{
            return(
              <div className="card home-card" key={item._id}>
          <h5>{item.postedBy.name}</h5>
          <div className="card-image">
            <img src={item.photo}/>
          </div>
          <i className='material-icons' style={{color:'black'}}>thumb_up</i>
          <h6>{item.title}</h6>
          <p>{item.body}</p>
          <input type="text" placeholder = "add a comment"/>
        </div>

            )
          })
        }
        </div>
    )
    
}

export default Home 