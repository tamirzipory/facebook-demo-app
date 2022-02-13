import express from 'express';
import { data } from './data.js';
import cors from 'cors';
import userRouter from './routers/userRouter.js'
import mongoose from 'mongoose';
import { MONGOURL } from './keys.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use('/api/users', userRouter);



mongoose.connect(MONGOURL, {
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

app.get('/api/products', (req, res) =>{
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) =>{
    const product = data.products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({ message: 'Product Not Found' });
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

app.listen(5000, console.log('server run'))