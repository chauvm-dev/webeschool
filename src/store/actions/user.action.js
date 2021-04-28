import * as actionTypes from "./actionTypes";

import axios from "../../api/index";

const signupStart = () => {
  return {
    type: actionTypes.SIGN_START,
  };
};
const signupSuccess = (dataSuccess) => {
  return {
    type: actionTypes.SIGN_SUCCESS,
    payload: dataSuccess,
  };
};
const signupFailed = (error) => {
  return {
    type: actionTypes.SIGN_FAILED,
    payload: error,
  };
};

export const signup = (signupData) => {
  return async (dispatch) => {
    try {
      dispatch(signupStart());
      const userResponse = await axios.post("/user/signup", signupData);
      dispatch(
        signupSuccess({
          userID: userResponse.data.userID,
          email: userResponse.data.email,
          lname: userResponse.data.lname,
          fname: userResponse.data.fname,
        })
      );
    } catch (error) {
      dispatch(signupFailed(error.message));
    }
  };
};

export const signin = (signinData) => {
  return async (dispatch) => {
    try {
      dispatch(signupStart());
      const userResponse = await axios.post("/user/signin", signinData);
      dispatch(
        signupSuccess({
          userID: userResponse.data.userID,
          email: userResponse.data.email,
          lname: userResponse.data.lname,
          fname: userResponse.data.fname,
          BOD: userResponse.data.BOD,
          gender: userResponse.data.gender,
        })
      );
    } catch (error) {
      dispatch(signupFailed(error.message));
    }
  };
};
