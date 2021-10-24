import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { socketContext } from "../../context/socketContext";
import { socketMessages } from "../../redux/actions/messagesAction";
import "./chatScreen.css";
import { UidContext } from "../../context/appContext";
import { XCircleIcon } from "@heroicons/react/solid";
import FlyoutChat from "./FlyoutChat";
import UserChat from "./UserChat";

const ChatScreen = ({ currentChatroom, setEditUser }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [imgZoom, setImgZoom] = useState(null);
  const [isZoom, setIsZoom] = useState(false);
  const [openFlyout, setOpenFlyout] = useState(false);
  const [openUsersChat, setOpenUsersChat] = useState(false);
  const user = useSelector((state) => state.userReducer);
  let messages = useSelector((state) => state.messagesReducer);
  const socket = useContext(socketContext);
  const dispatch = useDispatch();
  const Uid = useContext(UidContext);
  const picture = `/uploads/users/${user.picture}`;
  const lastMessageRef = useRef(null);
  useEffect(() => {
    setAllMessages(messages);
    setTimeout(() => {
      if (lastMessageRef.current !== null) {
        lastMessageRef.current.scrollIntoView({
          behavior: "smooth"
        });
      }
    }, 500);
  }, [messages, lastMessageRef]);

  // Socket
  const userTyping = (user, currentChatroomId) => {
    socket.emit("userTyping", user, currentChatroomId);
  };
  const userStopTyping = () => {
    socket.emit("userStopTyping");
  };
  socket.on("userTyping", (user, currentChatroomId) => {
    if (user._id !== Uid && currentChatroomId === currentChatroom._id) {
      // document.getElementById("user-typing").innerText = user.pseudo;
      // console.log(user.pseudo);
      setTimeout(() => {
        setIsTyping(true);
      }, 1000);
    } else {
      setIsTyping(false);
    }
  });
  socket.on("userStopTyping", () => {
    setIsTyping(false);
  });
  socket.on("newMessages", (message) => {
    dispatch(socketMessages(message));
  });

  const fullViewImg = (imageName) => {
    const imgPath = `/uploads/users/${imageName}`;
    setImgZoom(imgPath);
    console.log(imgPath);
    // document.querySelector("#imgFullscreen").classList.remove("hidden");
    setIsZoom(true);
  };

  return (
    <div className="w-full h-full overflow-hidden shadow-lg">
      <div
        className="grid min-w-full border rounded"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-span-2 bg-white h-full">
          <div
            style={{ height: "99vh" }}
            className="w-full flex flex-col justify-between pr-3"
          >
            <div className="flex items-center justify-between border-b border-gray-300 px-3 py-3">
              <span className="block ml-16 font-bold text-base text-2xl text-gray-600">
                #{currentChatroom.name}
              </span>

              <div className="flex">
                <span className="connected text-green-500 self-end -mr-3 z-10 ">
                  <svg width="12" height="12">
                    <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                  </svg>
                </span>
                <img
                  onClick={() => setOpenFlyout(!openFlyout)}
                  className="h-10 w-10 rounded-full cursor-pointer object-cover"
                  src={picture}
                  // src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  alt="username"
                />
              </div>
            </div>
            <div className="absolute right-10 top-12 z-40 rounded-r-none">
              <FlyoutChat
                open={openFlyout}
                setOpenUsersChat={setOpenUsersChat}
                setEditUser={setEditUser}
                openUsersChat={openUsersChat}
              />
              {openUsersChat && (
                <UserChat setOpenUsersChat={setOpenUsersChat} />
              )}
            </div>
            <div
              id="chat"
              className="w-full h-5/6 overflow-y-scroll py-5 px-10 relative"
            >
              <ul>
                {allMessages[0] &&
                  allMessages.map((message, index) => {
                    if (allMessages.length - 1 === index) {
                      return (
                        <span ref={lastMessageRef} key={message._id}>
                          <Message
                            message={message}
                            currentChatroom={currentChatroom}
                            fullViewImg={fullViewImg}
                          />
                        </span>
                      );
                    } else {
                      return (
                        <Message
                          key={message._id}
                          message={message}
                          currentChatroom={currentChatroom}
                          fullViewImg={fullViewImg}
                        />
                      );
                    }
                  })}
              </ul>
            </div>
            {isTyping && (
              <div id="dot-typing">
                <p id="dot-1">.</p>
                <p id="dot-2">.</p>
                <p id="dot-3">.</p>
              </div>
            )}

            <MessageForm
              userStopTyping={userStopTyping}
              userTyping={userTyping}
              currentChatroom={currentChatroom}
            />
          </div>
        </div>
      </div>
      {isZoom && (
        <div
          id="imgFullscreen"
          className=" z-index-1 absolute flex items-center justify-center top-8 left-1/3 bg-opacity-90 rounded-sm right-20 bottom-24 bg-gray-800"
        >
          <XCircleIcon
            onClick={() => setIsZoom(false)}
            className="hover:text-green-500 cursor-pointer text-green-100 h-10 w-10 absolute top-4 right-6"
          />
          <img
            className="relative w-full h-4/5 object-contain rounded-sm"
            src={imgZoom}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default ChatScreen;
