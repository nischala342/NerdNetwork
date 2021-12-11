import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './components/screens/home'
import Profile from "./components/screens/profile";
import Login from "./components/screens/Login";
import SignUp from "./components/screens/SignUp";
import CreatePost from "./components/screens/CreatePost";
import history from "./components/screens/history";
import { initialState ,reducer} from './reducers/userReducer'

export const UserContext = createContext()

const Routing =()=>{
  //const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      history.push('/')
      window.location.reload();
    }else{
      history.push('/login')
      window.location.reload();
    }
  },[])
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  
  
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/CreatePost" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
