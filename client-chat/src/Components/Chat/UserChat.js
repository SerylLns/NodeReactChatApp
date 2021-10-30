import { ChatAltIcon, XIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getChatroomUsers, isEmpty } from '../../utils';

const UserChat = ({ setOpenUsersChat }) => {
  const [chatroomUsers, setChatroomUsers] = useState([]);
  const users = useSelector((state) => state.usersReducer);
  const currentChatroom = useSelector(
    (state) => state.chatroomsReducer.currentChatroom
  );
  useState(() => {
    setChatroomUsers(getChatroomUsers(currentChatroom, users));
    console.log(getChatroomUsers(currentChatroom, users));
  }, []);
  return (
    <div className="bg-white absolute top-24 h-80 shadow-xl right-96 rounded-sm p-6 bg-gray-200 w-80 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 relative -mt-2 flex items-center pb-3 border-gray-300 justify-center border-b flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-xl text-center leading-6 font-xl text-gray-900">
            #{currentChatroom.name}
          </h3>
        </div>
        <XIcon
          onClick={() => setOpenUsersChat(false)}
          className="absolute -top-1 -right-1 cursor-pointer h-7 w-7"
        />
      </div>

      <div>
        <div className="flow-root mt-6">
          <ul className="-my-5 divide-y divide-gray-200">
            {!isEmpty(chatroomUsers) &&
              chatroomUsers.map((user) => {
                return (
                  <li className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`${__dirname}/uploads/users/${user.picture}`}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.pseudo}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          @{user.email.split("@")[0]}
                        </p>
                      </div>
                      <div className="flex">
                        <a
                          href="#"
                          className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <ChatAltIcon className="h-5 mr-1 w-5" />
                          Message
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        {/* <div className="mt-6">
          <a
            href="#"
            className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Fermer
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default UserChat;