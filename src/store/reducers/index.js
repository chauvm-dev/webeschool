import { combineReducers } from "redux";
import socketReducer from "./socket.reducer";
import userReducer from "./user.reducer";
import conversationReducer from "./conversation.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  socket: socketReducer,
  conversation: conversationReducer,
});

export default rootReducer;
