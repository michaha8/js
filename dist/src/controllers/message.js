"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const message_model_1 = __importDefault(require("../models/message_model"));
const conversation_model_1 = __importDefault(require("../models/conversation_model"));
const error_1 = __importDefault(require("../common/error"));
const response_1 = __importDefault(require("../common/response"));
//new message
const addNewMessage = (req, conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    const sender = req.userId;
    // console.log("add new msg");
    // console.log(req.body);
    console.log("conversationId:", conversationId.body.id);
    try {
        const message = yield new message_model_1.default({
            conversationId: conversationId.body.id,
            senderId: sender,
            text: req.body.text,
        });
        const savedMessage = yield message.save();
        console.log("saved a new message in db");
        return new response_1.default(savedMessage, sender, null);
    }
    catch (err) {
        return new response_1.default(null, sender, new error_1.default(400, err.message));
    }
});
// get user messages
const getUserMessages = (req, user) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(user);
    const sender = req.userId;
    console.log(sender);
    try {
        let isExist = yield conversation_model_1.default.findOne({
            members: [user, sender],
        });
        if (!isExist) {
            isExist = yield conversation_model_1.default.findOne({
                members: [sender, user],
            });
        }
        console.log(isExist);
        const messages = yield message_model_1.default.find({
            conversationId: isExist.id,
        });
        console.log("conversationId:", isExist.id);
        return new response_1.default(messages, sender, null);
    }
    catch (err) {
        return new response_1.default(null, sender, new error_1.default(400, err.message));
    }
});
module.exports = {
    addNewMessage,
    getUserMessages,
};
//# sourceMappingURL=message.js.map