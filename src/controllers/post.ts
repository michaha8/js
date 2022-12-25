import Post from '../models/post_model';
import { Request,Response } from 'express';
let update='';
const getPostById = async(req:Request,res:Response)=>{
    console.log(req.params.id);
    try{
        const posts=await Post.findById(req.params.id)
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({'error':'fail to get posts from db'})
    }

}

//-----------------------------------------------------------------
const getAllPosts = async(req:Request,res:Response)=>{
    
    try{
        let posts={}
        if(req.query.sender==null){
         posts=await Post.find()
        }else{
            posts=await Post.find({'sender':req.query.sender})
        }
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send({'error':'fail to get posts from db'})
    }

}

//-----------------------------------------------------------------------------
const addNewPost=async (req:Request,res:Response)=>{
    console.log(req.body)
    const post= new Post({
       message:req.body.message,
       sender:req.body.userId
    })
    try{
        const newPost=await post.save()
        console.log("save post in db");
        res.status(200).send(newPost)
    }catch(err){
        console.log("fail to send post in db");
        res.status(400).send({
            'status':'faile',
            'message':err.message
        })

    }
  
}
//-----------------------------------------------
const updatePost=async (req:Request,res:Response)=>{ 
    console.log('Update post');
    if(req.body.id===null||(req.params.id===undefined)){
        req.err(400).send({
            status:"Fail",
            message:"err.message"
        });

    }
    try{
        update=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});
        console.log("Update succes");
        console.log(req.body);
        res.status(200).send(update);

    }catch(error){
        res.status(400).send({error:"Update Failed"});
        
    }
};


export={getAllPosts,addNewPost,getPostById,updatePost}