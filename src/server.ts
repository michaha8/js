import express from 'express';
const app=express()
import dotenv from "dotenv"
dotenv.config();
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: true,limit:'1mb'}))
app.use(bodyParser.json())


import mongoose from 'mongoose';
mongoose.connect(process.env.DATABASE_URL)//,{useNewUrlParser: true})
const db=mongoose.connection
db.on('error',error =>{console.error(error)})
db.once('open',()=>{console.log('connected to mongo DB')})


app.use('/public',express.static('public'))//index.html 

import postRouter from './Rooutes/post_rout'
import messageRouter from './Rooutes/message_rout'


app.use('/post',postRouter);
app.use('/message',messageRouter);

export=app
