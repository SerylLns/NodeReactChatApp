const ObjectID = require("mongoose").Types.ObjectId;
const ChatroomModel = require("../models/chatroomModel");
const MessageModel = require("../models/messageModel");


module.exports.getChatrooms = async (req, res) => {
  console.log("chatroomIndex");
  try {
    const chatrooms = await ChatroomModel.find()
    res.status(201).json(chatrooms)
  } catch (error) {
    console.log(error);
    res.status(200).send({ error });
  }
}

module.exports.createChatrooms = async (req, res) => {
  console.log("chatroomCreate");
  const { name } = req.body;
  console.log(name);
  const chatroom = new ChatroomModel({
    name,
  });
  try {
    await chatroom.save();
    res.status(201).json(chatroom);
  } catch (error) {
    console.log(error);
    res.status(200).send({ error });
  }
};