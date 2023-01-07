import Message from "../models/message_model";
import Conversation from "../models/conversation_model";
import Error from "../common/error";
import Response from "../common/response";


//new message
const addNewMessage = async (req, conversationId) => {
  const sender = req.userId;
  // console.log("add new msg");
  // console.log(req.body);
  console.log("conversationId:", conversationId.body.id);
  try {
    const message = await new Message({
      conversationId: conversationId.body.id,
      senderId: sender,
      text: req.body.text,
    });
    const savedMessage = await message.save();
    console.log("saved a new message in db");
    return new Response(savedMessage, sender, null);
  } catch (err) {
    return new Response(null, sender, new Error(400, err.message));
  }
};

// get user messages
const getUserMessages = async (req, user) => {
  console.log(user);
  const sender = req.userId;
  console.log(sender);
  try {
    let isExist = await Conversation.findOne({
      members: [user, sender],
    });
    if (!isExist) {
      isExist = await Conversation.findOne({
        members: [sender, user],
      });
    }
    console.log(isExist);
    const messages = await Message.find({
      conversationId: isExist.id,
    });
    console.log("conversationId:", isExist.id);
    return new Response(messages, sender, null);
  } catch (err) {
    return new Response(null, sender, new Error(400, err.message));
  }
};

export = {
  addNewMessage,
  getUserMessages,
};