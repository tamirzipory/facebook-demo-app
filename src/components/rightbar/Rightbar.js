import React from 'react';
import './rightbar.css'; 
import {Users} from '../../utils/data'
import Online from '../online/Online';
import { useEffect } from 'react';
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {Add, Remove} from '@material-ui/icons'

function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser} = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user])

  useEffect(() =>{
    const getFriends = async() =>{
      try{  
        const friendList = await axios.get('/api/users/friends/'+user._id);
        setFriends(friendList.data);
      }
      catch(err){
        console.log(err)
      }
    };
    getFriends();
  },[user])
  const HomeRight = () =>{
    return (
      <>
        <div className='birhdayContainer'>
        <img className='birthdayImg' src="/images/birthday.png" alt="" />
        <span className='birthdayText'>
        {" "} <b> Tamir Zipory</b>
          </span>
      </div>
      <img className="rightAdd" src="/images/add1.png" alt=""/>
      <h4 className='rightbarTitle'>Online</h4>
      <ul className="rightbarFriendList">
        {Users.map((user) => (
        <Online key={user.id} user={user} />
              ))}
      </ul>
      </>
    )
  }

  async function handleFollow(e){
    try{
      if(followed){
      const {data} = await axios.put("/api/users/"+user._id+"/unfollow", {userId: currentUser._id, })
      }
      else{
        const {data} = await axios.put("/api/users/"+user._id+"/follow", {userId: currentUser._id, })
      }
      setFollowed(!followed)
    }
    catch(err){
      console.log(err)
    }

  }


  const ProfileRightBar = () =>{
    console.log(friends)
    return (
      <>
      {user.username !== currentUser.username && (
        <button className='rightbarFollowingButton' onClick={handleFollow}>
          {followed ? "Unfollow": "Follow"}
          {followed ? <Remove />: <Add />}
   
          </button>
      )}
        <h4 className='rightbarTitle'>User Information</h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>city: </span>
            <span className='rightbarInfoValue'>{user.city} </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>realationship: </span>
            <span className='rightbarInfoValue'>
              {user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "other" }
               </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>born in:  </span>
            <span className='rightbarInfoValue'> {user.from} </span>
          </div>
        </div>
        <h4 className='rightbarTitile'>User friends</h4>
        <div className='rightbarFollowings'>
          {
            friends.map((friend) =>(
              <Link to={"/profile/"+friend.username} style={{textDecoration: "none"}}>
              <div className='rightbarFollowing'>
              <img className='rightbarFollowingImg' src={friend.profilePicture ? PF+friend.profilePicture : PF+"person1.png"} alt=""/>
                <span className='rightbarFollowingName'>{friend.username}</span>
                </div>
                </Link>
            ))
          }
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src={`${PF}/person1.png`} alt=""/>
              <span className='rightbarFollowingName'>example</span>
          </div>
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src={`${PF}/person2.png`} alt=""/>
              <span className='rightbarFollowingName'>example</span>
          </div>
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src={`${PF}/person2.png`} alt=""/>
              <span className='rightbarFollowingName'>example</span>
          </div>
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src={`${PF}/person2.png`} alt=""/>
              <span className='rightbarFollowingName'>example</span>
          </div>
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src={`${PF}/person2.png`} alt=""/>
              <span className='rightbarFollowingName'>example</span>
          </div>
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src={`${PF}/person2.png`} alt=""/>
              <span className='rightbarFollowingName'>example</span>
          </div>
          <div className='rightbarFollowing'>
            <img className='rightbarFollowingImg' src={`${PF}/person3.png`} alt=""/>
              <span className='rightbarFollowingName'>example</span>
          </div>
        </div>
      </>
    )
  }

  return (
  <div className='rightbar'>
    <div className='rightbarWrapper'>
     {user ?  <ProfileRightBar /> : <HomeRight />}
     
    </div>
  </div>
  )
}

export default Rightbar;
