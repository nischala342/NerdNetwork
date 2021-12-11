import React,{useContext} from 'react' 
import {Link } from 'react-router-dom'
import { UserContext } from '../App'
const NavBar = () =>{
  const {state,dispatch} = useContext(UserContext)
  const renderList = ()=>{
    if(state)
    {
      return [<li><Link to="/Profile">Profile</Link></li>,
      <li><Link to="/CreatePost">Create Post</Link></li>
      ]
    }else
    {
      return[
        <li><Link to="/Login">Login</Link></li>,
        <li><Link to="/SignUp">Sign up</Link></li>
      ]
    }
  }
  
  
  return (
      <nav>
        <div className="nav-wrapper white">
          <ul id="nav-mobile" className="right">
          <Link to={state?"/":"/Login"}></Link>
          {renderList()}
          </ul>
        </div>
      </nav>
    );
}

export default NavBar 