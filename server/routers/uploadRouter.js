import multer from 'multer';
import express from 'express';


const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, 'hello');
      },
});

const upload = multer({ storage: storage });
uploadRouter.post("/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

export default uploadRouter;