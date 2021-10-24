const router = require("express").Router();
const userController = require('../controllers/userController');
const authentificationController = require("../controllers/authentificationController");
const imageUpload = require("../middleware/upload");
// Authenticate
router.post('/register', authentificationController.signUp);
router.post('/login', authentificationController.signIn);
router.get('/logout', authentificationController.logout);

// userDB 
router.get('/', userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.patch("/:id",imageUpload.single("file"), userController.updateUser);

module.exports = router;
