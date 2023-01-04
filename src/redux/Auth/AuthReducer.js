import Cookies from 'js-cookie';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';

export const RESET_BLOCK_AUTH = 'RESET_BLOCK_AUTH';
export const RESET_FLAGS_AUTH = 'RESET_FLAGS_AUTH';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';

export const CONTACTUS_REQUEST = 'CONTACTUS_REQUEST';
export const CONTACTUS_SUCCESS = 'CONTACTUS_SUCCESS';
export const CONTACTUS_ERROR = 'CONTACTUS_ERROR';

export const EDIT_PROFILE_REQUEST = "EDIT_PROFILE_REQUEST";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_ERROR = "EDIT_PROFILE_ERROR";

const block = {
  loading: false,
  error: "",
  success: false,
};

const initialState = {
  signup: { ...block, data: {} },
  login: { ...block },
  logout: { ...block },
  user: { ...block, data: {} },
  editUser: { ...block },
  forgotPassword: {
    ...block,
  },
  contactUs: { ...block, data: {} },
};

export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST:
      return { ...state, signup: { ...state.signup, loading: true } };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          ...state.signup,
          data: payload,
          loading: false,
          success: true,
          error: "",
        },
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signup: { ...state.signup, loading: false, error: payload },
      };

    case LOGIN_REQUEST:
      return { ...state, login: { ...state.login, loading: true } };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          success: true,
          error: "",
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          error: payload,
          data: {},
        },
      };

    case LOGOUT:
      Cookies.remove("token", { path: "/" });
      Cookies.remove("localId", { path: "/" });
      return {
        ...initialState,
        logout: {
          success: true,
        },
      };

    case GET_USER_REQUEST:
      return { ...state, user: { ...state.user, loading: true } };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          success: true,
          error: "",
          data: payload,
        },
      };
    case GET_USER_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          loading: false,
          error: payload,
          data: {},
        },
      };

    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPassword: { ...state.forgotPassword, loading: true },
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
          success: true,
          error: "",
        },
      };
    case FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          loading: false,
          error: payload,
        },
      };

    case CONTACTUS_REQUEST:
      return {
        ...state,
        contactUs: { ...state.contactUs, loading: true,success: false },
      };
    case CONTACTUS_SUCCESS:
      return {
        ...state,
        contactUs: {
          ...state.contactUs,
          data: payload,
          loading: false,
          success: true,
          error: "",
        }
      };
    case CONTACTUS_ERROR:
      return {
        ...state,
        contactUs: {
          ...state.contactUs,
          loading: false,
          error: payload,
          success: false
        },
      };

    case EDIT_PROFILE_REQUEST:
      return { ...state, editUser: { ...state.editUser, loading: true } };
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        editUser: {
          ...state.editUser,
          loading: false,
          success: true,
          error: "",
        },
        user: {
          ...state.user,
          data: payload,
        },
      };
    case EDIT_PROFILE_ERROR:
      return {
        ...state,
        editUser: { ...state.editUser, loading: false, error: payload },
      };

    //reset block with flag and data
    case RESET_BLOCK_AUTH:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...initialState[payload.blockType],
        },
      };

    //reset only flags(block)
    case RESET_FLAGS_AUTH:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...block,
        },
      };
    default:
      return state;
  }
};
