import express from 'express';
import dotenv from "dotenv";
import mongoose from "mongoose";
import Traderoute from './routes/Traderoute.js';
import bodyParser from 'body-parser';

const PORT=process.env.PORT||5000;
const app=express();


dotenv.config();

mongoose.connect(process.env.URI,{})
.then(()=>{
    console.log("Connected to Mongodb");
})
.catch((err)=>{
    console.error("Error connecting to MongoDB",err.message);
});
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',Traderoute);


app.get('/',(req,res)=>{
    console.log(req);
    res.send("Hello")
    
})
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})