
import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'

const newPostMessage='This is the new test post message'
const newPostSender='999000'
const updatedPostMessage='This is an Update post'
const nonExistentsender='Michael'
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
//------------------------------------------------------------------
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
    //--------------------------------------------------------------------------
    test("Get post by ID",async ()=>{
        const response=await request(app).get('/post/'+ newPostId)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
    })
    //Negative test
    test("Trying to get post by non existent Id <failed>",async()=>{
        const response = await request(app).get('/post/345345')
        expect(response.statusCode).toEqual(400)})
//--------------------------------------------------------------------------------
    test("Get post by sender",async ()=>{
        const response=await request(app).get('/post?sender='+newSender)
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(newPostMessage)
        expect(response.body[0].sender).toEqual(newSender)
    })
    //Negative test
    test("Trying to get post by Sender that not exist ",async()=>{
        const response = await request(app).get('/post?sender='+ nonExistentsender)
        expect(response.statusCode).toEqual(200)
        expect(response.body.length).toEqual(0)})
   
    //--------------------------------------------------------------------------
    test("Update post",async()=>{
        let response = await request(app).put('/post/'+ newPostId).send({
            "message": updatedPostMessage,
            "sender": newPostSender
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(updatedPostMessage)
        expect(response.body.sender).toEqual(newPostSender)

        response = await request(app).get('/post/' + newPostId)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(updatedPostMessage)
        expect(response.body.sender).toEqual(newPostSender)

        // Negative test
        response = await request(app).put('/post/345345').send({
            "message": updatedPostMessage,
            "sender": newPostSender
        })
        expect(response.statusCode).toEqual(400)

        response = await request(app).put('/post/' + newPostId).send({
            "message": updatedPostMessage,
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(updatedPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
    })
    })














    // test("Update post",async ()=>{
    //     const response=await request(app).get('/post')
    //     expect(response.statusCode).toEqual(200)
    //     expect(response.body[0].sender).toEqual(newPostSender)
    //     expect(response.body[0]._id).toEqual(newPostId)

    // })
    // test("Get post by sender ",async ()=>{
    //     const response=await request(app).get('/post/')
    //     expect(response.statusCode).toEqual(200)
    //     expect(response.body[0].message).toEqual(newPostMessage)
    //     expect(response.body[0].sender).toEqual(210)
    // })
    // describe("Restric access without Auth /",()=>{
    //     test("It should respond with error",async ()=>{
    //         const response =await request(app).get("/post");
    //         expect(response.statusCode).not.toEqual(200);
    //     }) 
    // })

