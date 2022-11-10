const express=require('express');
const router =express.Router();
const post=require('../controllers/message.js')


router.get('/',post.getAllMessages)
router.post('/', post.addNewMessage)

module.exports=router;