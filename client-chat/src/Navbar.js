/* This example requires Tailwind CSS v2.0+ */
import { ChatIcon, XIcon } from "@heroicons/react/outline";
import {
  LogoutIcon,
  PlusCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import cookie from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCurrent, createChatroom } from "./redux/actions/chatroomsAction";
import { getAllMessages } from "./redux/actions/messagesAction";
import LogoChat from "./assets/logoChat.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({
  chatrooms,
  currentChatroom,
  mobileMenuOpen,
  setMobileMenuOpen,
  setEditUser,
}) {
  const dispatch = useDispatch();
  const [createCanal, setCreateCanal] = useState(false);
  const [canalName, setCanalName] = useState("");

  const changeCurrentChatroom = (chatroom) => {
    dispatch(changeCurrent(chatroom));
    dispatch(getAllMessages(chatroom._id));
  };

  const handleCreateCanal = () => {
    if (!createCanal) {
      setCreateCanal(true);
    } else {
      if (canalName !== "") {
        dispatch(createChatroom(canalName));
        setCanalName("");
        setCreateCanal(false);
      } else {
        setCreateCanal(false);
      }
    }
  };
  

  return (
    <div
      id={`${mobileMenuOpen ? "navbar-open" : "navbar"}`}
      className="flex flex-col border-r relative border-gray-200 h-full pt-5 pb-4 bg-white overflow-y-auto"
    >
      <div id="close-menu">
        <XIcon
          onClick={() => setMobileMenuOpen(false)}
          className="h-10 w-1O text-right cursor-pointer text-gray-700"
        />
      </div>
      <div className="flex items-center justify-center flex-shrink-0 px-4">
        <h2 className="text-3xl" style={{ fontFamily: "cursive" }}>
          Messenger
        </h2>
        <img
          className="h-8 w-auto rounded-md ml-3"
          src={LogoChat}
          alt="Workflow"
        />
      </div>
      <div
        style={{ fontFamily: "cursive" }}
        className="flex w-5/6  items-center justify-center rounded-xl my-5 mx-auto"
      >
        {createCanal ? (
          <input
            type="text"
            name="namel"
            id="name"
            value={canalName}
            onChange={(e) => setCanalName(e.target.value)}
            className="shadow-sm w-3/4 mx-auto focus:ring-green-500 focus:border-green-500 block sm:text-sm border-gray-300 rounded-md"
            placeholder="Nom du canal"
          />
        ) : (
          <span className="text-lg">Ajouter un canal</span>
        )}
        <PlusCircleIcon
          onClick={() => handleCreateCanal()}
          className="cursor-pointer flex-shrink-0 text-green-400 ml-2 hover:text-green-700 h-10 w-1O rounded-full transition-colors"
        />
      </div>
      <div className="mt-5 flex-grow flex flex-col">
        <nav className="flex-1 px-2 bg-white space-y-1" aria-label="Sidebar">
          {chatrooms &&
            chatrooms.map((item) => (
              <p
                onClick={() => changeCurrentChatroom(item)}
                key={item.name}
                className={classNames(
                  item._id === currentChatroom._id
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-green-50 hover:text-gray-900",
                  "group flex cursor-pointer items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <ChatIcon className="mr-3 flex-shrink-0 h-6 w-6" />
                <span className="flex-1 text-center text-base	text-green-800 font-medium text-lg font-large">
                  {item.name}
                </span>
              </p>
            ))}
        </nav>
      </div>

    </div>
  );
}
