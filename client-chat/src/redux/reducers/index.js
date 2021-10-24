import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import chatroomsReducer from './chatroomsReducer';
import messagesReducer from './messagesReducer';

export default combineReducers({
  userReducer,
  usersReducer,
  chatroomsReducer,
  messagesReducer
});