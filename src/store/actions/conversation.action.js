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

export const loadConversation = () => {
  return async (dispatch) => {
    try {
      dispatch(loadStart());
      const conversationResponse = await axios.get("/conversation/get");
      dispatch(loadConversationSuccess(conversationResponse));
    } catch (error) {
      dispatch(loadConversationFailed(error.response));
    }
  };
};

const loadDeatailStart = () => {
  return {
    type: actionTypes.DETAIL_LOAD_START,
  };
};
const loadDetailSuccess = (dataSuccess) => {
  return {
    type: actionTypes.DETAIL_LOAD_SUCCESS,
    payload: dataSuccess,
  };
};

const loadDetailFailed = (error) => {
  return {
    type: actionTypes.DETAIL_LOAD_FAILED,
    payload: error,
  };
};

export const loadDetail = (roomId) => {
  return async (dispatch) => {
    try {
      dispatch(loadDeatailStart());
      const detailResponse = await axios.get(`/conversation/detail/${roomId}`);
      dispatch(loadDetailSuccess({ roomId, ...detailResponse }));
    } catch (error) {
      dispatch(loadDetailFailed(error.response));
    }
  };
};
