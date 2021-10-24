import axios from "axios";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const GET_ALL_MESSAGES = "GET_ALL_MESSAGES";
export const SOCKET_MESSAGES = "SOCKET_MESSAGES";

export const sendMessage = (chatroomId, data, socket) => {
  return (dispatch) => {
    return axios({
      url: `${process.env.REACT_APP_API_URL}api/chatrooms/${chatroomId}/messages`,
      method: "POST",
      data,
    })
      .then((res) => {
        dispatch({ type: SEND_MESSAGE, payload: res.data });
        socket.emit("newMessage", res.data);
      })
      .catch((err) => console.log(err));
  };
};

export const getAllMessages = (chatroomId) => {
  return (dispatch) => {
    return axios({
      url: `${process.env.REACT_APP_API_URL}api/chatrooms/${chatroomId}/messages`,
      method: "GET",
    }).then((res) => {
      console.log(res);
      dispatch({ type: GET_ALL_MESSAGES, payload: res.data })
    }).catch((err) => {
      console.log(err);
    });
  }
}

export const socketMessages = (message) => {
  return (dispatch) => {
    dispatch({ type: SOCKET_MESSAGES, payload: message });
  }
}