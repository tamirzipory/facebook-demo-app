import express from 'express'
const authRouter = express.Router();
import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'

authRouter.post('/register', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = await new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
    })   
        const user = await newUser.save();
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(404).send(err)
    }
})


authRouter.post('/login', async(req, res) =>{
    try{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        res.status(404).json("user not found");
        return ;
    }
    const passworddec = await bcrypt.compare(req.body.password, user.password)
    if(!passworddec){
        res.status(404).json("wrong password");
        return ;
    }
    res.status(200).json(user)
    }
    catch(err){
        console.log(err);
        res.status(500).json(err)
        return ;
    }
})

export default authRouter;