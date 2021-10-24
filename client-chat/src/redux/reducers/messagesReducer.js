import { SEND_MESSAGE, GET_ALL_MESSAGES, SOCKET_MESSAGES } from "../actions/messagesAction";

const initialState = {};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MESSAGES:
      return action.payload;
    case SEND_MESSAGE:
      let newState = [...state]
      newState.push(action.payload)
      return newState;
    case SOCKET_MESSAGES:
      let find = state.filter((message) => message._id === action.payload._id);
      if (find.length > 0) {
        return state
      } else {
        let newState = [...state];
        newState.push(action.payload);
        return newState;
      }
    default:
      return state;
  }
}
