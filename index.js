import express from "express";
import mongoose from "mongoose";
import  morgan from "morgan";
import router from "./routes/UserRoutes.js";



const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v9',router);


mongoose.connect('mongodb+srv://annusingh:anusingh58@cluster0.md93vry.mongodb.net/accesstoken')

.then(()=>console.log("db connected"))
.catch((error)=>console.log("db error=>",error))

app.listen(7000,()=>console.log("working port on 7000"))
