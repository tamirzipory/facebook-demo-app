import React from 'react';
import {PermMedia, Label, Room, EmojiEmotions} from "@material-ui/icons";
import './share.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Share() {
    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    async function submitHandler(e){
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try{
                await axios.post('/api/upload', data)
            }
            catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post('/api/posts', newPost)
        }
        catch(err){
            console.log(err)
        }
    }

  return (
  <div className='share'>
      <div className='shareWrapper'>
          <div className='shareTop'>
              <img className="shareProfileImg" src={user.profilePicture ? user.profilePicture :`${PF}nopicture.png`} alt=""/>
              <input ref={desc} className="shareInput" placeholder={"what's you want to write " + user.username+" today"} type="text"  />
          </div>
          <hr className='shareHr' />
      <form className='shareButtom' onSubmit={submitHandler}>
          <div className='shareOptions'>
              <label htmlFor='file' className='shareOption'>
              <PermMedia htmlColor="blue" className='shareIcon'/>
              <span className='shareOptionsText'>photo or video</span>
              <input style={{display: 'none'}} type="file" id="file" accept=".png,.jpg" onChange = {(e) => setFile(e.target.files[0])}/>
              </label>

              <div className='shareOption'>
              <Label htmlColor="gray" className='shareIcon'/>
              <span className='shareOptionsText'>Tag</span>
              </div>

              <div className='shareOption'>
              <Room htmlColor="red" className='shareIcon'/>
              <span className='shareOptionsText'>Location</span>
              </div>

              <div className='shareOption'>
              <EmojiEmotions htmlColor="yellow" className='shareIcon'/>
              <span className='shareOptionsText'>Feelings</span>
              </div>

          </div>
         <button className='shareButton' type="submit">share</button>
      </form>
      </div>
  </div>
  )
}

export default Share;
