import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Routes,useNavigate} from 'react-router-dom'
import Home from './components/screens/home'
import Profile from "./components/screens/profile";
import Login from "./components/screens/Login";
import SignUp from "./components/screens/SignUp";
import CreatePost from "./components/screens/CreatePost";
import history from "./components/screens/history";
import UserProfile from "./components/screens/UserProfile"
import { initialState ,reducer} from './reducers/userReducer'
import SubscribedUserPosts from "./components/screens/SubscribedUserPosts"

export const UserContext = createContext()

const Routing =()=>{
  const history = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      //history('/')
      //window.location.reload();
    }else{
      history('/login')
      //window.location.reload();
    }
  },[])
return (
  <Routes>
    <Route path="/" element={<SubscribedUserPosts />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/SignUp" element={<SignUp />} />
    <Route exact path="/Profile" element={<Profile />} />
    <Route path="/CreatePost" element={<CreatePost />} />
    <Route path="/Profile/:userid" element={<UserProfile />} />
    <Route path="/SubscribedPosts" element={<SubscribedUserPosts />} />
    <Route path="/Explore" element={<Home />} />
  </Routes>
);

}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  
  
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
