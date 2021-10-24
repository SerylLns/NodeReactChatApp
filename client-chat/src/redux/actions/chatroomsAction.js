import axios from "axios";

export const GET_ALL_CHATROOMS = "GET_ALL_CHATROOMS";
export const CHANGE_CURRENT = "CHANGE_CURRENT";
export const CREATE_CHATROOM = "CREATE_CHATROOM";

export const getAllChatrooms = () => {
  return (dispatch) => {
    return axios.get(`${process.env.REACT_APP_API_URL}api/chatrooms`)
      .then(res => {
        dispatch({ type: GET_ALL_CHATROOMS, payload: res.data })
      }).catch(err => console.log(err));
    
  }
}

export const changeCurrent = (chatroom) => {
  return (dispatch) => {
    dispatch({type: CHANGE_CURRENT, payload: chatroom})
  }
}

export const createChatroom = (name) => {
  return (dispatch) => {
    return axios(`${process.env.REACT_APP_API_URL}api/chatrooms`, {
      method: "POST",
      data: {
        name: name,
      },
    })
      .then((res) => {
        dispatch({ type: CREATE_CHATROOM, payload: res.data })
      })
      .catch((err) => console.log(err));
  }
}

