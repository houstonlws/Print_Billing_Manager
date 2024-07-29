import { CONSTANTS } from '../../config/constants';
import { AuthState } from '../../types/auth.types';

interface Payload {
  type: string;
  payload: any;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: null,
  notifications: [],
};

export const authReducer = (state = initialState, action: Payload) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case CONSTANTS.REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case CONSTANTS.LOGIN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
      };
    }
    case CONSTANTS.LOGIN_FAIL: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case CONSTANTS.REGISTER_SUCCESS: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case CONSTANTS.REGISTER_FAIL: {
      return {
        ...state,
        loggedIn: false,
      };
    }
    case CONSTANTS.LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    }
    case CONSTANTS.GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: payload,
      };
    }
    case CONSTANTS.GET_USER_DATA_FAIL: {
      return {
        ...state,
        loggedIn: false,
        user: null,
      };
    }
    case CONSTANTS.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        notifications: payload,
      };
    }
    case CONSTANTS.GET_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        notifications: [],
      };
    }
    case CONSTANTS.SET_USER_TYPE: {
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
