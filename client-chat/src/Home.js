import React, { useContext, useState } from "react";
import Login from "./Components/Login/Login";
import { UidContext } from "./context/appContext";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import ChatScreen from "./Components/Chat/ChatScreen";
import { isEmpty } from "./utils";
import UserSetting from "./Components/settings/UserSetting";


const Home = () => {
  const uid = useContext(UidContext);
  const chatroomsState = useSelector((state) => state.chatroomsReducer);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editUser, setEditUser] = useState(false);
  
  return (
    <div>
      {uid ? (
        <div className="flex App" style={{ width: "100vw", height: "100vh" }}>
          <div
            onClick={(e) => setMobileMenuOpen(!mobileMenuOpen)}
            className={`burger-menu ${mobileMenuOpen ? "is-open" : "is-close"}`}
          >
            <span></span>
          </div>
          <Navbar
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            chatrooms={chatroomsState.chatrooms}
            currentChatroom={chatroomsState.currentChatroom}
            setEditUser={setEditUser}
          />
          {isEmpty(chatroomsState.currentChatroom) ? (
            <h1>Empty</h1>
          ) : (
            <ChatScreen
              setEditUser={setEditUser}
              currentChatroom={chatroomsState.currentChatroom}
            />
          )}
        </div>
      ) : (
        <Login />
      )}
      {editUser && <UserSetting setEditUser={setEditUser} />}
    </div>
  );
};

export default Home;
