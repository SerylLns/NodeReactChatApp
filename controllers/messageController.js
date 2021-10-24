const ObjectID = require("mongoose").Types.ObjectId;
const MessageModel = require("../models/messageModel");
const ChatroomModel = require("../models/chatroomModel");

module.exports.createMessage = async (req, res) => {
  console.log("postMsgs");
  const { content, senderId, pseudo, video } = req.body;
  if (!ObjectID.isValid(req.params.chatroom_id)) {
    return res.status(400).send("ID unknown : " + req.params.chatroom_id);
  }
  if (req.file !== undefined) {
    console.log(req.file);
  }
  try {
    const newMessage = new MessageModel({
      content,
      senderId,
      chatroomId: req.params.chatroom_id,
      author: pseudo,
      video,
      picture: req.file === undefined ? null : req.file.filename,
    });
    await newMessage.save();
    const chatroom =  await ChatroomModel.findById(req.params.chatroom_id);
    const senders = await chatroom.userIds
    if (senders === undefined || senders.indexOf(senderId) === -1) {
      await senders.push(senderId);
      await chatroom.updateOne({ userIds: senders });
    }
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(200).send({ error });
  }
};

module.exports.getAllMessages = async (req, res) => {
  console.log("get All Messages");
  const chatroomId = req.params.chatroom_id;
  console.log(chatroomId);
  try {
    // const chatroom = await ChatroomModel.findById(chatroomId);
    const messages = await MessageModel.find({ chatroomId: chatroomId });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(200).send({ error });
  }
};
