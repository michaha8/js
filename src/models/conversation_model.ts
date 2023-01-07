import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [String],
    },
  },
  { timestamps: true }
);

export = mongoose.model("Conversation", ConversationSchema);