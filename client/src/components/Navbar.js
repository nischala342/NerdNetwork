import React,{useContext} from 'react' 
import {Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
const NavBar = () =>{
  const {state,dispatch} = useContext(UserContext)
  const history = useNavigate()
  const renderList = ()=>{
    if(state)
    {
      return [
        <li>
          <Link to="/Profile">Profile</Link>
        </li>,
        <li>
          <Link to="/CreatePost">Create Post</Link>
        </li>,
        <li><button type="button" className="btn red" 
        onClick={() =>{
           localStorage.clear();
           dispatch({ type: "CLEAR" });
           history('/login')
        }}>
          Logout
        </button></li>
      ];
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