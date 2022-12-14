"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const ConversationSchema = new mongoose_1.default.Schema({
    members: {
        type: [String],
    },
}, { timestamps: true });
module.exports = mongoose_1.default.model("Conversation", ConversationSchema);
//# sourceMappingURL=conversation_model.js.map