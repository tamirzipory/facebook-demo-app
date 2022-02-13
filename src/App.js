import './App.css';
import {BrowserRouter, BrowserRouter as Router, Link, Navigate, Route,  Routes } from 'react-router-dom';
import Home from './components/pages/home/Home';

import Profile from './components/pages/profile/Profile';
import Login from './components/pages/login/Login';
import Register from './components/pages/register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      
    <Routes>

      <Route exact path="/"
       element={user ? <Home /> : <Login /> }/>

      <Route path="/login"
       element={user ? <Navigate to="/" /> : <Login />}/>

      <Route path="/register"
       element={user ? <Navigate to="/" /> : <Register />}/>

      <Route path="/profile/:username" 
      element={<Profile />}/>

    </Routes>
  
    </BrowserRouter>
  );
}

export default App;
