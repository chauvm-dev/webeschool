import * as actionTypes from "../actions/actionTypes";
const initialState = {
  conversations: [],
  loading: false,
  error: null,
};

const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONVERSATION_LOAD_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CONVERSATION_LOAD_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.CONVERSATION_LOAD_SUCCESS:
      return {
        ...state,
        conversations: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default conversationReducer;
