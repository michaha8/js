/**
* @swagger
* tags:
*   name: Messages
*   description: The Messages API
*/

import express from 'express';
const router =express.Router();
import message from '../controllers/message';


router.get('/',message.getAllMessages)
router.post('/', message.addNewMessage)

export=router;