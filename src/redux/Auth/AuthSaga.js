import { all, call, put, takeLatest } from "redux-saga/effects";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Axios } from "../../api/axios";
import { getSimplifiedError } from "../../utils/error";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESET_FLAGS_AUTH,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,
  CONTACTUS_REQUEST,
  CONTACTUS_SUCCESS,
  CONTACTUS_ERROR,
  RESET_BLOCK_AUTH,
} from "./AuthReducer";

async function signup({ email, password }) {
  const payload = {
    returnSecureToken: true,
    email,
    password,
  };
  const baseURL = `${process.env.REACT_APP_API_BASE_URL_ACCOUNTS}signUp?key=${process.env.REACT_APP_API_BASE_URL_ACCOUNTS_KEY}`;
  return await Axios.post("", payload, { baseURL });
}
async function signupData({ urlLocalId, ...payload }) {
  return await Axios.post(`signup/${urlLocalId}.json`, payload);
}
function* handleSignup({ payload }) {
  try {
    const response = yield call(signup, payload);
    if (response.idToken) {
      payload.urlLocalId = response.localId;
      const options = { path: "/" };
      Cookies.set("token", response.idToken, options);
      Cookies.set("localId", response.localId, options);
      delete payload?.password;
      delete payload?.conPassword;
      const responseUser = yield call(signupData, payload);
      yield put({
        type: SIGNUP_SUCCESS,
        payload,
      });
      yield put({
        type: RESET_FLAGS_AUTH,
        payload: { blockType: "signup" },
      });
      window.location.href = "/";
    }
  } catch (error) {
    yield put({
      type: SIGNUP_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

async function editProfile({ userId, ...payload }) {
  const localId = Cookies.get("localId");
  return await Axios.put(`signup/${localId}/${userId}.json`, payload);
}

function* handleEditProfile({ payload }) {
  try {
    const response = yield call(editProfile, payload);

    yield put({
      type: EDIT_PROFILE_SUCCESS,
      payload,
    });
  } catch (error) {
    yield put({
      type: EDIT_PROFILE_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

async function login(payload) {
  const baseURL = `${process.env.REACT_APP_API_BASE_URL_ACCOUNTS}signInWithPassword?key=${process.env.REACT_APP_API_BASE_URL_ACCOUNTS_KEY}`;
  return await Axios.post("", payload, { baseURL });
}
function* handleLogin({ payload }) {
  try {
    const response = yield call(login, payload);
    if (response.idToken) {
      debugger;
      const options = { path: "/" };
      Cookies.set("token", response.idToken, options);
      Cookies.set("localId", response.localId, options);
      yield put({
        type: LOGIN_SUCCESS,
      });
      yield put({
        type: GET_USER_SUCCESS,
        data: response.user,
      });
      yield put({
        type: RESET_FLAGS_AUTH,
        payload: { blockType: "login" },
      });
      window.location.href = "/";
      toast("login successfully.", { type: "success" });
    }
  } catch (error) {
    yield put({
      type: LOGIN_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

const userId = Cookies.get("localId");
async function getUser() {
  return await Axios.get(`signup/${userId}.json`);
}

function* handleGetUser() {
  try {
    const response = yield call(getUser);
    if (response) {
      const userDataId = Object.keys(response)[0];
      const userInfo = response[userDataId];
      userInfo.userId = userDataId;
      yield put({
        type: GET_USER_SUCCESS,
        payload: userInfo,
      });
    }
  } catch (error) {
    yield put({
      type: GET_USER_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

async function forgotPasswordAPI(payload) {
  return await Axios.post("/rest-auth/password/reset/", payload);
}

function* handleForgotPassword({ payload }) {
  try {
    const response = yield call(forgotPasswordAPI, payload);
    if (response) {
      yield put({
        type: FORGOT_PASSWORD_SUCCESS,
      });

      yield put({
        type: RESET_FLAGS_AUTH,
        payload: { blockType: "forgotPassword" },
      });
    }
  } catch (error) {
    yield put({
      type: FORGOT_PASSWORD_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

async function contactUsAPI(payload) {
  return await Axios.post("contact.json", payload);
}

function* handleContactUs({ payload }) {
  try {
    const response = yield call(contactUsAPI, payload);
    if (response) {
      yield put({
        type: CONTACTUS_SUCCESS,
        payload: payload,
      });
      toast("message send successfully.", { type: "success" });
    }
  } catch (error) {
    yield put({
      type: CONTACTUS_ERROR,
      error: getSimplifiedError(error),
    });
    if (error) {
      toast(getSimplifiedError(error), { type: "error" });
    }
  }
}

export default all([
  takeLatest(SIGNUP_REQUEST, handleSignup),
  takeLatest(LOGIN_REQUEST, handleLogin),
  takeLatest(GET_USER_REQUEST, handleGetUser),
  takeLatest(FORGOT_PASSWORD_REQUEST, handleForgotPassword),
  takeLatest(CONTACTUS_REQUEST, handleContactUs),
  takeLatest(EDIT_PROFILE_REQUEST, handleEditProfile),
]);
