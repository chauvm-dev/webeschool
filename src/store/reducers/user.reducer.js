import * as actionTypes from "../actions/actionTypes";
const initialState = {
  userID: null,
  email: null,
  fname: null,
  lname: null,
  BOD: null,
  gender: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_SUCCESS:
      return {
        ...state,
        fname: action.payload.fname,
        lname: action.payload.lname,
        BOD: action.payload.BOD,
        gender: action.payload.gender,
        userID: action.payload.userID,
        email: action.payload.email,
        loading: false,
        error: null,
      };
    case actionTypes.SIGN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SIGN_FAILED:
      return {
        ...state,
        fname: null,
        lname: null,
        BOD: null,
        gender: null,
        userID: null,
        email: null,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
