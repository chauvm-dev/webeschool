import * as actionTypes from "./actionTypes";

import axios from "../../api/index";

export const signStart = () => {
  return {
    type: actionTypes.SIGN_START,
  };
};
const signSuccess = (dataSuccess) => {
  console.log(dataSuccess);
  return {
    type: actionTypes.SIGN_SUCCESS,
    payload: dataSuccess,
  };
};
const signoutSuccess = () => {
  return {
    type: actionTypes.SIGN_OUT_SUCCESS,
  };
};
export const signFailed = (error) => {
  console.log(error?.response);
  return {
    type: actionTypes.SIGN_FAILED,
    payload: error,
  };
};

export const signup = (signupData) => {
  return async (dispatch) => {
    try {
      dispatch(signStart());
      const userResponse = await axios.post("/user/signup", signupData);
      console.log(userResponse);
      dispatch(
        signSuccess({
          _id: userResponse._id,
          username: userResponse.username,
          socialType: userResponse.socialType,
          socialAuthentication: userResponse.socialAuthentication,
          profile: userResponse.profile,
          _conversations: userResponse._conversations,
          status: userResponse.status,
          createdAt: userResponse.createdAt,
          updatedAt: userResponse.updatedAt,
        })
      );
    } catch (error) {
      dispatch(signFailed(error));
    }
  };
};

export const signin = (signinData) => {
  return async (dispatch) => {
    try {
      dispatch(signStart());
      const userResponse = await axios.post("/user/signin", signinData);
      dispatch(
        signSuccess({
          _id: userResponse._id,
          username: userResponse.username,
          socialType: userResponse.socialType,
          socialAuthentication: userResponse.socialAuthentication,
          profile: userResponse.profile,
          _conversations: userResponse._conversations,
          status: userResponse.status,
          createdAt: userResponse.createdAt,
          updatedAt: userResponse.updatedAt,
        })
      );
    } catch (error) {
      dispatch(signFailed(error));
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      dispatch(signStart());
      await axios.get("/user/signout");
      dispatch(signoutSuccess());
    } catch (error) {
      dispatch(signFailed(error));
    }
  };
};
