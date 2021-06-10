import * as actionTypes from "../actions/actionTypes";
const initialState = {
  socket: null,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SOCKET_CONNECT_SUCCESS:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};

export default socketReducer;
