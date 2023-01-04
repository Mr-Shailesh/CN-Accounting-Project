import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  RESET_BLOCK_AUTH,
  RESET_FLAGS_AUTH,
  LOGOUT,
  GET_USER_REQUEST,
  FORGOT_PASSWORD_REQUEST,
  EDIT_PROFILE_REQUEST,
  CONTACTUS_REQUEST
} from './AuthReducer';

export const signup = (payload) => ({ type: SIGNUP_REQUEST, payload });

export const login = (payload) => ({ type: LOGIN_REQUEST, payload });

export const resetLogin = (payload) => ({ type: LOGIN_REQUEST, payload });

export const editProfile = (payload) => ({
  type: EDIT_PROFILE_REQUEST,
  payload,
});

export const getUser = () => ({ type: GET_USER_REQUEST });

export const forgotPassword = (payload) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload,
});

export const contactUsApi = (payload) => ({
  type: CONTACTUS_REQUEST,
  payload,
});

export const resetBlockAuth = (payload) => ({
  type: RESET_BLOCK_AUTH,
  payload,
});

export const resetFlagsAuth = (payload) => ({
  type: RESET_FLAGS_AUTH,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});
