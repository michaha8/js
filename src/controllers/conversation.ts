import Conversation from "../models/conversation_model";
import response from "../common/response";
import error from "../common/error";

const getConversation = async (req) => {
  console.log("Get Conversation");
  // const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;
  const senderId = req.userId;
  try {
    let isExist = await Conversation.findOne({
      members: [senderId, receiverId],
    });
    if (!isExist)
      isExist = await Conversation.findOne({
        members: [receiverId, senderId],
      });
    //new conversation
    if (!isExist) {
      const newConversation = await new Conversation({
        members: [senderId, receiverId],
      });
      const savedConversation = await newConversation.save();
      return new response(savedConversation, senderId, null);
    } else {
      //exist conversation
      console.log("conversation exists in db");
      return new response(isExist, senderId, null);
    }
  } catch (err) {
    return new response(null, senderId, new error(400, err.message));
  }
};

export = {
  getConversation,
};