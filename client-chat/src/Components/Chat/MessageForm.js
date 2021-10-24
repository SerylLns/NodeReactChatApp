import React, { useContext, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { socketContext } from '../../context/socketContext';
import { sendMessage } from '../../redux/actions/messagesAction';
import { ExclamationIcon } from "@heroicons/react/solid";
const MessageForm = ({ currentChatroom, userTyping, userStopTyping }) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const fieldRef = useRef();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userReducer);
  const socket = useContext(socketContext);
  
  const handleClick = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("content", message);
    data.append("pseudo", currentUser.pseudo);
    data.append("chatroom", currentChatroom._id);
    data.append("senderId", currentUser._id);
    dispatch(
      sendMessage(currentChatroom._id, data, socket)
    );
    setMessage("");
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }
  return (
    <div className="w-full py-7  px-5 flex items-center  border-t border-gray-300">
      <button
        onClick={() => fieldRef.current.click()}
        className="outline-none stroke-current hover:text-green-600 focus:outline-none"
      >
        <svg
          className="text-green-400 hover:text-green-600 h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <input
          ref={fieldRef}
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            visibility: "hidden",
            width: 0,
            height: 0,
            position: "absolute",
          }}
        />
      </button>

      <button className="outline-none focus:outline-none ml-1">
        <svg
          className="text-gray-400 hover:text-gray-600 h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          />
        </svg>
      </button>
      <input
        aria-placeholder="Ecrivez votre message..."
        placeholder="Ecrivez votre message..."
        onFocus={() => userTyping(currentUser, currentChatroom._id)}
        onBlur={() => userStopTyping()}
        onKeyPress={(e) => handleKeyPress(e)}
        className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:ring-green-500 focus:border-green-500 border border-gray-300 focus:text-gray-700"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        name="message"
        required
      />
      <span className="flex items-center  mr-3">{message.length < 200 ? message.length : <ExclamationIcon className="h-5 w-5 text-red-500"/> }/200</span>
      <button
        onClick={handleClick}
        className="outline-none focus:outline-none"
        type="submit"
      >
        <svg
          className="text-gray-400 h-7 w-7 hover:text-green-600 origin-center transform rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
  );
};

export default MessageForm;