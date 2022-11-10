const express =require('express')
const app=express()
const dotenv=require("dotenv").config();
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended: true,limit:'1mb'}))
app.use(bodyParser.json())

const mongoose =require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db=mongoose.connection
db.on('error',error =>{console.error(error)})
db.once('open',()=>{console.log('connected to mongo DB')})


app.use('/public',express.static('public'))//index.html 

const postRouter=require('./Rooutes/post_rout.js')
const messageRouter= require('./Rooutes/message_rout')

app.use('/post',postRouter);
app.use('/message',messageRouter);

module.exports=app
