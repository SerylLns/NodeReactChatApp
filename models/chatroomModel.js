const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 25,
  },
  userIds: {
    type: [String],
  }
},{timestamps: {}});

const ChatroomModel = mongoose.model("chatroom", chatroomSchema);
module.exports = ChatroomModel;
