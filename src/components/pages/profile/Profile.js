import React, { useEffect, useState } from 'react';
import Feed from '../../feed/Feed';
import Rightbar from '../../rightbar/Rightbar';
import Sidebar from '../../sidebar/Sidebar';
import Topbar from '../../topbar/Topbar';
import './profile.css'
import axios from 'axios';
import {useParams} from 'react-router-dom';

function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams();
  const username = params.username;

  

  useEffect(() => {
    const fetchUser = async () => {
      try{
      const {data} = await axios.get(`/api/users?username=${username}`);
      setUser(data);
      }
      catch(err){
        console.log(err)
      }
    };
    fetchUser();
  }, [username]);
  
  return (
    <>
    <Topbar /> 
    <div className='profile'>
      <Sidebar />
      <div className='profileRight'>
      <div className='profileRightTop'>
          <div className='profileCover'>
              <img className='profileCoverImg' src={user.coverPicture ? user.coverPicture : PF+"/nopicture.png"} alt="" />
              <img className='profileUserImg' src={user.profilePicture ? user.coverPicture : PF+"/nopicture.png"} alt="" />
          </div>
          <div className='profileInfo'>
              <h4 className='profileInfoName'>{user.username}</h4>
              <span className='profileInfoDesc'>description of my profile</span>
          </div>
      </div>
          <div className='profileRightButtom'>
             <Feed username={username}/>
             <Rightbar user={user}/>
      </div>
    </div>
</div>
</>
  )
}

export default Profile;
