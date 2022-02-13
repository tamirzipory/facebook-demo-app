import express from 'express'
const userRouter = express.Router();
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import Post from '../models/PostModel.js';




userRouter.put('/:id', async (req, res) => {
  if(req.body.userId === req.params.id || req.user.isAdmin){
    if(req.body.password){
      try{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      catch(err){
        res.status(500).json(err);
        return ;
      }
    }
    try{
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      })
      res.status(200).send("Account has been updated");
      return ;
    }
    catch(err){
      res.status(500).json(err);
      return ;
    }
  }
  else{
    res.status(403).send("you can update only your account");
    return ;
  }
 
})


userRouter.delete('/:id', async (req, res) =>{
  const user = await User.findById(req.params.id);
  if(!user){
    res.status(404).send("no user with this id");
    return ;
  }
  try{
  const deleteUser = await user.remove();
  res.send({message: 'User Deleted Successfully', user: deleteUser});
}
  catch(err){
    return res.status(500).json(err);
  }
})

userRouter.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

userRouter.put('/:id/follow', async(req, res) =>{
  const user1 = await User.findById(req.params.id);
  const currentUser1 = await User.findById(req.body.userId);
  console.log(user1)
  console.log(currentUser1)
  if(req.body.userId !== req.params.id){
    try{
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)){
        user.followers.push(req.body.userId ) 
        const updateuser1 = await user.save(); 
        currentUser.followings.push(req.params.id);
        const updateusere = await currentUser.save(); 
        res.status(200).send("sucess follow");
      }
      else{
        res.status(403).send("already follow")
      }
     
    }
    catch(err){
      res.status(500).json(err.message);
    }
  }
  else{
    res.status(403).send("you can't follow yourself");
  }
})

userRouter.put("/:id/unfollow", async (req, res) => {
  console.log(req.body)
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        user.followers.pull(req.body.userId ) 
        const updateuser1 = await user.save(); 
        currentUser.followings.pull(req.params.id);
        const updateusere = await currentUser.save(); 
        res.status(200).send("user has been unfollowed");
      } else {
        
        res.status(403).send("you dont follow this user");
      }
    } catch (err) {
    
      return res.status(500).json(err);
       
    }
  } else {
   
    res.status(403).send("you can't unfollow yourself");
  }
});

//get friends

userRouter.get('/friends/:userId', async(req, res) =>{
 
  try{
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) =>{
        return User.findById(friendId)
      })
    )
  
  let friendsList = [];
  friends.map((friend) =>{
    const {_id, username, profilePicture} = friend;
    friendsList.push({_id, username, profilePicture});
  });
  res.status(200).json(friendsList);
  }
  catch(err){
    res.status(500).json(err)
  }
})



    


export default userRouter;