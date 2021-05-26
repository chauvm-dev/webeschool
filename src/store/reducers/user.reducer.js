import * as actionTypes from "../actions/actionTypes";
const initialState = {
  _id: null,
  username: null,
  socialType: null,
  socialAuthentication: null,
  profile: {
    address: {
      provide: [],
      district: [],
      ward: [],
      street: null,
    },
    BOD: null,
    sex: "private",
    phone: null,
    _avatar: null,
    displayName: null,
  },
  _conversations: null,
  status: null,
  createdAt: null,
  updatedAt: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_SUCCESS:
      return {
        ...state,
        _id: action.payload._id,
        username: action.payload.username,
        socialType: action.payload.socialType,
        socialAuthentication: action.payload.socialAuthentication,
        profile: action.payload.profile,
        _conversations: action.payload._conversations,
        status: action.payload.status,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
        loading: false,
        error: null,
      };
    case actionTypes.SIGN_OUT_SUCCESS:
      return {
        ...initialState,
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
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
