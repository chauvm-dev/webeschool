import * as actionTypes from "./actionTypes";
import store from "../index";
import axios from "../../api/index";

const emitMessageSuccess = () => {
  return {
    type: actionTypes.MESSAGE_EMIT_SUCCESS,
  };
};

export const emitMessage = (room, message) => {
  return async (dispatch) => {
    try {
      console.log(message);

      store
        .getState()
        .socket.socket.emit("CLIENT_EMIT_MESSAGE", { room, message });
      dispatch(emitMessageSuccess());
    } catch (error) {
      console.log(error);
      // dispatch(loadMessageFailed(error.response));
    }
  };
};
