const express=require('express');
const router =express.Router();
const message=require('../controllers/message.js')


router.get('/',message.getAllMessages)
router.post('/', message.addNewMessage)

module.exports=router;