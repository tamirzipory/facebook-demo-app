import React, { useEffect, useState } from 'react';
import {MoreVert} from '@material-ui/icons'
import { Link } from 'react-router-dom';
import './post.css';
import axios from 'axios'
import Axios from 'axios'
import {format} from "timeago.js"
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Post({post}) {

    const {user:  currentUser} = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/api/users?userId=${post.userId}`);
          setUser(res.data);
         
        };
        fetchUser();
      }, [post.userId]);
    
 
    
    async function likeHandler(){
        try{
            await axios.put('/api/posts/'+post._id+"/like", {userId: currentUser._id, })
        }
        catch(err){
            console.log(err)
        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
    }

    async function deletePost(){
      
      try{
        await axios.delete(`/api/posts/${post._id}?userId=${currentUser._id}`, {userId: currentUser._id});
      }
      catch(err){
        console.log(err);
      }

    }
 
  
  return (
  <div className='post'>
     
      <div className="postWrapper">
          <div className='postTop'>
              <div className='postTopLeft'>
                  <Link to={`profile/${user.username}`}>
                  <img className='postProfileImg' src={ user.profilePicture ? user.profilePicture : `${PF}nopicture.png` } alt=""/>
                  </Link>
                  <span className='postUsername'>{user.username}</span>
                  <span className="postDate">{format(post.createdAt)}</span>
              </div>
              <div className='postTopRight'>
                <div className='dropdown'>
                <Link to="#">
                  <MoreVert /> <i className='fa fa-caret-down'>{' '}</i>
                  </Link>
                  <ul className='dropdown-content'>

                  <li>
                  <button className='deleteButton' onClick={deletePost}>delete</button>
                  </li>

                  </ul>
                </div>
              </div>
          </div>
          <div className='postCenter'>
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
          </div>
          <div className='postButtom'>
              <div className='postButtomLeft'>
              <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
              <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
              </div>
              <div className='postButtomRight'>
                  <span className='postCommentText'>0 comments</span>
              </div>
          </div>
      </div>

  </div>
  )
}

export default Post;
