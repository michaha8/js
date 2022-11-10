
const request = require('supertest')
const app= require('../server')
const mongoose =require('mongoose')
const Post=require('../models/post_model')
const { post } = require('../server')

const newPostMessage='This is the new test post message'
const newPostSender='999000'
let newPostId=''
let newSender=''
beforeAll(async ()=>{
   await Post.remove()
})

afterAll(async ()=>{
    await Post.remove()
    mongoose.connection.close()
 })

describe("Posts Tests ",()=>{
    test("Add new post",async ()=>{
        const response=await request(app).post('/post').send({
            "message":newPostMessage,
            "sender":newPostSender
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
        newPostId=response.body._id
        newSender=response.body.sender
    })

    test("Get all posts",async ()=>{
        const response=await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(newPostMessage)
        expect(response.body[0].sender).toEqual(newPostSender)
    })
    test("Get all posts containing given text in post message",async ()=>{
        const response=await request(app).get('/post?message=new')
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(newPostMessage)
        expect(response.body[0].sender).toEqual(newPostSender)
    })
    test("Get post by ID",async ()=>{
        const response=await request(app).get('/post/'+ newPostId)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
    })
    test("Get post by sender",async ()=>{
        const response=await request(app).get('/post/')
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(newPostMessage)
        expect(response.body[0].sender).toEqual(newSender)
    })
    // test("Get post by sender ",async ()=>{
    //     const response=await request(app).get('/post/')
    //     expect(response.statusCode).toEqual(200)
    //     expect(response.body[0].message).toEqual(newPostMessage)
    //     expect(response.body[0].sender).toEqual(210)
    // })
})
