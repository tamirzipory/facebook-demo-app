import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import Share from '../share/Share';
import './feed.css';
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);

    useEffect(() => {
      const fetchPosts = async () =>{
        try{
        const {data} = username 
        ? await axios.get('/api/posts/profile/'+username)
        : await axios.get("/api/posts/timeline/"+user._id);
        setPosts(data.sort((a, c) => {
          return new Date(c.createdAt) - new Date(a.createdAt);
        }))
        }
        catch(err){
          console.log(err);
        }
      }
      fetchPosts()
    },[username, user])
  
  return (
  <div className='feed'>
      <div className='feedWrapper'>
      {username === user.username && <Share />}
      {posts.map((post) => (
        <Post key={post._id} post={post}/>  
      ))}
      
      </div>
  </div>
  )
}

export default Feed;
