import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      require: true,
    },
    response: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.chats || mongoose.model("chats", chatSchema);
export default Chat;
