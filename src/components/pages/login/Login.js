import React, { useRef } from 'react';
import { useContext } from 'react';
import { loginCall } from '../../../apiCalls';
import { AuthContext } from '../../../context/AuthContext';
import {CircularProgress} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import './login.css'
function Login() {
    const navigate = useNavigate()
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    function handleClick(e){
        e.preventDefault()
        loginCall({email :email.current.value, password :password.current.value}, dispatch)
    }

    function movepage(){
       navigate("/register")
    }
 
  return (
  <div className='login'>
      <div className='loginWrapper'>
          <div className='loginLeft'>
              <h3 className='loginLogo'>logo here</h3>
              <span className='loginDesc'>connect here</span>
          </div>

          <div className='loginRight'>
              <form className='loginBox' onSubmit={handleClick}>
                  <input
                   type="email"
                   className='loginInput'
                   placeholder='Email'
                   ref={email} />

                    <input
                    type="password"
                   className='loginInput'
                   placeholder='Password'
                   ref={password} />

                   <button className='loginButton' type="submit" disabled={isFetching}>
                   {isFetching ? <CircularProgress color="white" size="20px"/>: "Log in"}</button>

                   <span className='loginForgot'>Forgot Password?</span>
                   <button className="loginRegisterButton" onClick = {movepage}>Create a new account</button>

              </form>
              <span className='loginDesc'></span>
          </div>

      </div>

  </div>
  )
}

export default Login;
