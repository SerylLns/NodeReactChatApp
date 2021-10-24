const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
      required: true,
      maxlength: 500,
    },
    senderId: {
      type: String,
      require: true,
    },
    chatroomId: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
    },
    video: {
      type: String,
    }
  },
  { timestamps: {} }
);

const MessageModel = mongoose.model("message", messageSchema);
module.exports = MessageModel;
