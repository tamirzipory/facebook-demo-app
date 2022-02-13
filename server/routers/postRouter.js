import express from 'express'
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
const postRouter = express.Router();

const app = express();
app.use(express.urlencoded({extended: true}))

 //create
    postRouter.post('/', async(req, res) => {
        const newpost = new Post(req.body);
        try{
            const savepost = await newpost.save();
            return res.status(200).json(savepost)
        }
        catch(err){
            return res.status(500).json(err.message)
        }
    
    
      
    })
    //update

    postRouter.put('/:id', async(req, res) =>{
        try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
          post.desc = req.body.desc
          const updatePost = await post.save()
            res.status(200).send("update success")
        }
        else{
            res.status(403).send("you can update only your posts")
        }

        }
        catch(err){
            return res.status(500).json(err.message)
        }
    })

   
    //delete
    postRouter.delete("/:id", async (req, res) => {
        try {
          const post = await Post.findById(req.params.id);
          if (post.userId == req.query.userId) {
            await post.deleteOne();
            return res.status(200).json("the post has been deleted");
          } else {
            return res.status(403).json("you can delete only your post");
          }
        } catch (err) {
          return res.status(500).json(err);
        }
      });
     


    //like
    postRouter.put('/:id/like', async(req, res) => {
        console.log(req.params.id)
        const post = await Post.findById(req.params.id);
        console.log(post)
        try{
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)){
                post.likes.push(req.body.userId)
                const updatePost = post.save();
                res.status(200).send("the post has been liked");
            }  
            else{
                post.likes.pull(req.body.userId)
                const updatePost = post.save();
                res.status(200).send("the post has been unliked");
            }
        }
        catch(err){
                return res.status(500).json(err.message)
     }
    })
    //get 
     postRouter.get('/:id', async (req, res) => {
         try{
        const post = await Post.findById(req.params.id)
        if(post){
            res.status(200).json(post);
        }
        else{
            return res.status(404).send("no post")
        }
        }
        catch(err){
            return res.status(500).json(err.message)
 }
     })
    //get all
    postRouter.get('/', async (req, res) => {
        try{
        const posts = await Post.find({});
        return res.status(200).json(posts);
   }
    catch(err){
        return res.status(500).json(err.message)
    }
    })

    //get user's all posts

    postRouter.get('/profile/:username', async(req, res) =>{
        try{
            console.log("hello")
            const user = await User.findOne({username: req.params.username})
            const posts = await Post.find({userId: user._id})
            res.status(200).json(posts)
        }
        catch(err){
            return res.status(500).json(err.message)
        }
    })


    //get timeline posts

    postRouter.get('/timeline/:userId', async(req, res) =>{
        try{
            const currentUser = await User.findById(req.params.userId);
            const userPosts = await Post.find({userId: currentUser._id})
            const friendsPost = await Promise.all(
                currentUser.followings.map((friendId) => {
                    console.log(friendId)
                    return Post.find({userId: friendId});
                })
            );
           res.status(200).json(userPosts.concat(...friendsPost))
        }
        catch(err){
            return res.status(500).json(err.message)
        }
    })


export default postRouter;