import React, { useContext, useState } from "react";
import Login from "./Components/Login/Login";
import { UidContext } from "./context/appContext";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import ChatScreen from "./Components/Chat/ChatScreen";
import { isEmpty } from "./utils";
import UserSetting from "./Components/settings/UserSetting";
import { ChatAlt2Icon, ClockIcon, HeartIcon, PhotographIcon } from "@heroicons/react/solid";

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
            <>
              <div className="items-center flex flex-wrap">
                <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                  <img
                    alt="..."
                    className="max-w-full rounded-lg shadow-lg"
                    src="https://images.unsplash.com/photo-1552068751-34cb5cf055b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=465&q=80"
                  />
                </div>
                <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                  <div className="md:pr-12">
                    <div className="text-green-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-green-300 mt-8">
                      <ChatAlt2Icon class="h-10 w-10" />
                    </div>
                    <h3 className="text-3xl font-semibold">Messenger</h3>
                    <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                      Bienvenue sur messenger, une petite application de
                      messagerie instantanée. <br /> Pour commencer veuillez
                      utiliser un canal de communication à votre gauche, ou bien
                      en créer un nouveau.
                    </p>
                    <ul className="list-none mt-6">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <ClockIcon class="h-5 w-5" />
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-500 mb-2">
                              Temps réel
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <PhotographIcon class="h-5 w-5" />
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-500 mb-2">
                              Envoie d'image et video youtube
                            </h4>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 mr-3">
                              <HeartIcon class="h-5 w-5" />
                            </span>
                          </div>
                          <div>
                            <h4 className="text-blueGray-500 mb-2">
                              Fait avec amour
                            </h4>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
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
