import { CHANGE_CURRENT, CREATE_CHATROOM, GET_ALL_CHATROOMS } from "../actions/chatroomsAction";

const initialState = {
  currentChatroom: {},
  chatrooms: []
};

export default function chatroomsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHATROOMS:
      return {
        ...state,
        chatrooms: action.payload
      };
    case CHANGE_CURRENT:
      return {
        ...state,
        currentChatroom: action.payload
      }
    case CREATE_CHATROOM:
      const newState = [...state.chatrooms]
      newState.push(action.payload);
      return {
        ...state,
        chatrooms: newState,
      }
    default:
      return state;
  }
}

