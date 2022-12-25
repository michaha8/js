

import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/post_model'
import User from '../models/user_model'

const newPostMessage='This is the new test post message'
let newPostSender='999000'
const updatedPostMessage='This is an Update post'
const nonExistentsender='Michael'
let newPostId=''
let newSender=''


const userEmail = "user1@gmail.com"
const userPassword = "12345"
let accessToken = ''

beforeAll(async ()=>{
    await Post.remove()
    await User.remove()
    const res = await request(app).post('/auth/register').send({
        "email": userEmail,
        "password": userPassword 
    })
    newPostSender = res.body._id
})
async function loginUser() {
    const response = await request(app).post('/auth/login').send({
        "email": userEmail,
        "password": userPassword 
    })
    accessToken = response.body.accessToken
}
beforeEach(async ()=>{
    await loginUser()
})

afterAll(async ()=>{
    await Post.remove()
    await User.remove()
    mongoose.connection.close()
 })

describe("Posts Tests ",()=>{
    test("Add new post",async ()=>{
        const response = await request(app).post('/post').set('Authorization', 'JWT ' + accessToken)
        .send({
            "message": newPostMessage,
            "sender": newPostSender
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
        newPostId=response.body._id
        newSender=response.body.sender
    })

//------------------------------------------------------------------
    test("Get all posts",async ()=>{
        const response = await request(app).get('/post').set('Authorization', 'JWT ' + accessToken)
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
        const response = await request(app).get('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(newPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
    })
    //Negative test
    test("Trying to get post by non existent Id <failed>",async()=>{
        const response = await request(app).get('/post/12345').set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(400)
//--------------------------------------------------------------------------------
    test("Get post by sender",async ()=>{
        const response = await request(app).get('/post?sender=' + newPostSender).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(newPostMessage)
        expect(response.body[0].sender).toEqual(newPostSender)
    })
    //Negative test
    test("Trying to get post by Sender that not exist ",async()=>{
        const response = await request(app).get('/post?sender='+ nonExistentsender)
        expect(response.statusCode).toEqual(200)
        expect(response.body.length).toEqual(0)})
   
    //--------------------------------------------------------------------------
    test("Update post by id",async()=>{
        let response = await request(app).put('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        .send({
            "message": updatedPostMessage,
            "sender": newPostSender
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(updatedPostMessage)
        expect(response.body.sender).toEqual(newPostSender)

        response = await request(app).get('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(updatedPostMessage)
        expect(response.body.sender).toEqual(newPostSender)

        response = await request(app).put('/post/12345').set('Authorization', 'JWT ' + accessToken)
        .send({
            "message": updatedPostMessage,
            "sender": newPostSender
        })
        expect(response.statusCode).toEqual(400)

        response = await request(app).put('/post/' + newPostId).set('Authorization', 'JWT ' + accessToken)
        .send({
            "message": updatedPostMessage,
        })
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(updatedPostMessage)
        expect(response.body.sender).toEqual(newPostSender)
    })
    })
})

