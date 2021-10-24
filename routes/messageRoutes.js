const { Router  } = require("express");
const { getChatrooms, createChatrooms } = require("../controllers/chatroomController");
const {
  createMessage,
  getAllMessages,
} = require("../controllers/messageController");
const router = Router();
const imageUpload = require("../middleware/upload");

// chatrooms
router.get("/", getChatrooms);
router.post("/", createChatrooms);

// messages
router.post(
  "/:chatroom_id/messages",
  imageUpload.single("file"),
  createMessage
);
router.get("/:chatroom_id/messages", getAllMessages)


module.exports = router;


