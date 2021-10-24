const { Server } = require("socket.io");
const MessageModel = require("./models/messageModel");

module.exports.initSocket = (server) => {
  let users = 0
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    users++;
    console.log("a user connected");
    socket.once("enterChatroom", () => {
      console.log("user in chatroom", users.length)
    });
      
    socket.on("newMessage", (message) => {
      console.log("new Message !!!!!!!!!!");
      io.sockets.emit("newMessages", message);
    });

    socket.on("userTyping", (user, currentChatroomId) => {
      io.sockets.emit("userTyping", user, currentChatroomId);
      console.log("user Typing !");

    });
    socket.on("userStopTyping", () => {
      io.sockets.emit("userStopTyping");
    });

  });


};
