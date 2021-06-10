import { io } from "socket.io-client";
import * as actionTypes from "./actionTypes";
import store from "../index";

const socketConnectSuccess = (socket) => {
  return {
    type: actionTypes.SOCKET_CONNECT_SUCCESS,
    payload: socket,
  };
};

const socketConnectFailed = (error) => {
  return {
    type: actionTypes.SOCKET_CONNECT_FAILED,
    payload: error,
  };
};
export const socketConnect = () => {
  return async (dispatch) => {
    try {
      const socket = io(process.env.REACT_APP_BACKEND_URL, {
        withCredentials: true,
      });
      socket.on("connect", () => {
        socket.emit("client_join_rooms", {
          _id: store.getState().user._id,
          _conversations: [...store.getState().user._conversations],
        });
        dispatch(socketConnectSuccess(socket));
      });
      socket.on("disconnect", () => {
        console.log(socket.id); // undefined
      });
      socket.on("connect_error", (error) => {
        console.log(error instanceof Error); // true
        console.log(error.message); // not authorized
        console.log(error.data); // { content: "Please retry later" }
        dispatch(socketConnectFailed(error.response));
      });
      socket.on("SERVER_EMIT_MESSAGE", (newMessage) => {
        console.log(newMessage);
      });
    } catch (error) {
      console.log(error);
      dispatch(socketConnectFailed(error.response));
    }
  };
};
