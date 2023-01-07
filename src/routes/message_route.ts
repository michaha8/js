
// /**
// * @swagger
// * tags:
// *   name: Messages
// *   description: The Messages API
// */

import express from "express";
const router = express.Router();
import Request from "../common/request";
import Message from "../controllers/message";
import Auth from "../controllers/auth";
import Conversation from "../controllers/conversation";

router.post("/", Auth.authenticateMiddleware, async (req, res) => {
  console.log(req.body);
  try {
    const conversationId = await Conversation.getConversation(
      Request.fromRestRequest(req)
    );
    const response = await Message.addNewMessage(
      Request.fromRestRequest(req),
      conversationId
    );
    response.sendRestResponse(res);
  } catch (err) {
    res.status(400).send({
      status: "fail",
      message: err.message,
    });
  }
});

// get user messages
router.get("/", Auth.authenticateMiddleware, async (req, res) => {
  try {
    const response = await Message.getUserMessages(
      Request.fromRestRequest(req),
      req.query.user
    );
    response.sendRestResponse(res);
  } catch (err) {
    res.status(400).send({
      status: "fail",
      message: err.message,
    });
  }
});

export = router;



