import { io } from "socket.io-client";
import * as actionTypes from "./actionTypes";
import store from "../index";
// const signSuccess = (dataSuccess) => {
//   console.log(dataSuccess);
//   return {
//     type: actionTypes.SIGN_SUCCESS,
//     payload: dataSuccess,
//   };
// };
// const signoutSuccess = () => {
//   return {
//     type: actionTypes.SIGN_OUT_SUCCESS,
//   };
// };
export const socketConnect = () => {
  const socket = io(process.env.REACT_APP_BACKEND_URL, {
    withCredentials: true,
  });
  socket.on("connect", () => {
    socket.emit("client_join_rooms", {
      _id: store.getState().user._id,
      _conversations: [...store.getState().user._conversations],
    });
  });

  socket.on("disconnect", () => {
    console.log(socket.id); // undefined
  });

  socket.on("connect_error", (err) => {
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err.data); // { content: "Please retry later" }
  });
  return {
    type: actionTypes.SOCKET_CONNECT,
    payload: socket,
  };
};
