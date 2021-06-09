import * as actionTypes from "../actions/actionTypes";
const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_SUCCESS:
      return {
        ...state,
        socket: action.payload.socket,
      };
    default:
      return state;
  }
};

export default socketReducer;
