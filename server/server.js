import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import multer from 'multer'
import path from 'path'
import cors from 'cors'
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/auth.js";
import postRouter  from "./routers/postRouter.js"
import bodyParser from 'body-parser'







dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json());

const __dirname = path.resolve();

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);





mongoose.connect(process.env.MONGO_URL || "mongodb+srv://tamirzip:tamir0202@tamirwork.oque8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log("mongodb not connected");
    console.log(error);
});




app.get('/', (req, res) =>{
    res.send('hello')
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });


app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

app.listen(5000, console.log('server run'))