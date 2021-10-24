const express = require("express");
const http = require('http');
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require('./routes/messageRoutes');
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const {  initSocket } = require("./socket");
const cors = require('cors');

const app = express();

// CORS
const corsOptions = {
  origin: "http://www.localhost:3000",
  credentials: true,
  // allowedHeaders: ["sessionId", "Content-Type"],
  // exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// PROD
app.use(express.static("client-chat/build"));

app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user.id);
});
// routes
app.use("/api/users", userRoutes);
app.use("/api/chatrooms", messageRoutes );

app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "./client-chat/public/index.html"));

});

const server = http.createServer(app)

// websocket
initSocket(server);

server.listen(8000, () => {
  console.log("listening on *:8000");
});
