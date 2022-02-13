import React from 'react';
import './topbar.css'
import {Search, Person, Notifications, Chat} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
/*  <img src={ user.profilePicture ? user.profilePicture : PF+"/noPicture.png"} className='topbarImg' alt="fg"></img>*/

function Topbar() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
  <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to="/" style={{textDecoration: "none"}}>
        <span className='logo'>logo here</span>
        </Link>
        </div>
        <div className='topbarCenter'>
    <div className='searchbar'>
      <Search className="searchIcon" />
      <input className='searchInput'
        type="text"
        placeholder='search for friends, post or video'
        />
    </div>
        </div>
         
        <div className='topbarRight'>
         <span className='topbarLink'>Home page</span>
         <span className='topbarLink'>time line</span>
    
        </div>


        <div className='topbarIcons'>
          <div className='topbarIconItem'>
          <Person />
          <span className='topbarIconBadge'>
            1
          </span>
        </div>

        
        <div className='topbarIconItem'>
          <Chat />
          <span className='topbarIconBadge'>
            3
          </span>
        </div>

        <div className='topbarIconItem'>
          <Notifications />
          <span className='topbarIconBadge'>
            2
          </span>
        </div>
      
    <img src={`${PF}nopicture.png`} className='topbarImg' alt=""></img>
   
      </div>
  </div>
  )
}

export default Topbar;
