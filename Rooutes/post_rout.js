const express=require('express');
const router =express.Router();
const post=require('../controllers/post.js')

router.get('/:id',post.getPostById)
router.get('/',post.getAllPosts)
router.post('/', post.addNewPost)
router.put('/:id',post.updatePost)


module.exports=router;

