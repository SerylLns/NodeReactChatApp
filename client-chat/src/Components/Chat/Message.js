import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../../context/appContext";
import { dateParser, youtubeVideo } from "../../utils";

const Message = ({ message, currentChatroom, fullViewImg }) => {
  const currentUserId = useContext(UidContext);
  const isAuthor = currentUserId === message.senderId;
  const [video, setVideo] = useState()
  const [currentMessage, setCurrentMessage] = useState(message.content);
  useEffect(() => {

    console.log(`${__dirname}`);
    let video = youtubeVideo(message.content);
    if (video !== null) {
      setVideo(video.youtubeLink);
      setCurrentMessage(message.content.replace(video.originalLink, ""));
    }
  }, [message]);
  return (
    <>
      {isAuthor ? (
        <li className="w-full flex justify-end">
          <div
            className="bg-green-100 pb-8 rounded px-5 py-2 my-2 text-gray-700 relative"
            style={{ maxWidth: "300px" }}
          >
            <span className="block font-bold text-medium">
              {message.author}:
            </span>
            <span className="block overflow-x-hidden overflow-ellipsis">
              {currentMessage}
            </span>
            {message.picture && (
              <img
                onClick={() => fullViewImg(message.picture)}
                id="img-message"
                className="h-4/5 pb-10 mx-auto shadow-lg  rounded-sm my-2"
                src={`${__dirname}/uploads/users/${message.picture}`}
                alt={message.content}
              />
            )}
            {video && (
              <iframe
                src={video}
                style={{ width: "100%" }}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture"
                allowFullScreen
                title={video}
              ></iframe>
            )}
            <span className="block text-xs text-right">
              {dateParser(message.createdAt)}
            </span>
          </div>
        </li>
      ) : (
        <li className="w-full flex justify-start">
          <div
            className="bg-gray-100 rounded px-5 pb-8 py-2 my-2 text-gray-700 relative"
            style={{ maxWidth: "300px" }}
          >
            <span className="block font-bold text-green-800 text-medium">
              {message.author}:
            </span>
            <span className="block overflow-x-hidden overflow-ellipsis">
              {currentMessage}
            </span>
            {message.picture && (
              <img
                onClick={() => fullViewImg(message.picture)}
                id="img-message"
                className="h-4/5 pb-10 mx-auto shadow-lg  rounded-sm my-2"
                src={`/uploads/users/${message.picture}`}
                alt={message.content}
              />
            )}
            {video && (
              <iframe
                src={video}
                style={{ width: "100%" }}
                className="py-3"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture"
                allowFullScreen
                title={video}
              ></iframe>
            )}
            <span className="block text-xs text-right">
              {dateParser(message.createdAt)}
            </span>
          </div>
        </li>
      )}
    </>
  );
};

export default Message;
