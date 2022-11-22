import express from 'express';
const router =express.Router();
import post from '../controllers/post';

router.get('/:id',post.getPostById)
router.get('/',post.getAllPosts)
router.post('/', post.addNewPost)
router.put('/:id',post.updatePost)


export=router;

