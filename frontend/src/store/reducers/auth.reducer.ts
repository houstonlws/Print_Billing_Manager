import { CONSTANTS } from '../constants';
import { AuthState } from '../../types/auth.types';

const {
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAIL,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  SET_USER_TYPE,
} = CONSTANTS;

interface Payload {
  type: string;
  payload: any;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
  notifications: [],
};

export const authReducer = (state = initialState, action: Payload) => {
  const { type, payload } = action;

  switch (type) {
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: payload,
      };
    }
    case GET_USER_DATA_FAIL: {
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    }
    case GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notifications: payload,
      };
    }
    case GET_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        notifications: [],
      };
    }
    case SET_USER_TYPE: {
      return {
        ...state,
        user: {
          ...state.user,
          type: payload,
        },
      };
    }
    default:
      return state;
  }
};
