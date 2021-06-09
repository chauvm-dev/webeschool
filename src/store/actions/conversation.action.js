import * as actionTypes from "./actionTypes";

import axios from "../../api/index";

export const loadStart = () => {
  return {
    type: actionTypes.CONVERSATION_LOAD_START,
  };
};
const loadConversationSuccess = (dataSuccess) => {
  return {
    type: actionTypes.CONVERSATION_LOAD_SUCCESS,
    payload: dataSuccess,
  };
};

export const loadConversationFailed = (error) => {
  return {
    type: actionTypes.CONVERSATION_LOAD_FAILED,
    payload: error,
  };
};

export const loadConversation = (signinData) => {
  return async (dispatch) => {
    try {
      dispatch(loadStart());
      const conversationResponse = await axios.get(
        "/conversation/get",
        signinData
      );
      dispatch(loadConversationSuccess(conversationResponse));
    } catch (error) {
      dispatch(loadConversationFailed(error.response));
    }
  };
};
