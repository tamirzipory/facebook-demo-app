import React from 'react';
import { useRef } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './register.css'

function Register() {
  const navigate = useNavigate()
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  async function handleClick (e) {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!")
    }
    else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        passwordAgain: passwordAgain.current.value
      }
      try{
      const res = await axios.post('/api/auth/register', user);
      console.log(res);
      navigate('/login')
      }
      catch(err){

      }
    }
  }
  return(
   <div className='register'>
       <div className='registerWrapper'>
           <div className='registerLeft'>
           <h3 className='registerLogo'>logo here</h3>
              <span className='registerDesc'>connect here</span>
           </div>

           <div className='registerRight'>

           <form className="registerBox" onSubmit={handleClick}>

            <input
             ref={username} 
             placeholder="Username" 
             className="registerInput" 
             required
             />

            <input
             ref={email} 
             placeholder="Email" 
             type="email"
             className="registerInput" 
             required
             />

            <input
             ref={password} 
             placeholder="Password"
             type="password"
             className="registerInput"
             required 
              />

            <input
             ref={passwordAgain} 
             type="password"
             placeholder="Password Again" 
             className="registerInput" 
             required
             />

            <button type='submit' className="registerButton">Sign Up</button>
            <button className="registerLoginButton">
              Log into Account
            </button>
          </form>
              <span className='registerDesc'></span>
           </div>
       </div>

    </div>
  )
}

export default Register;
