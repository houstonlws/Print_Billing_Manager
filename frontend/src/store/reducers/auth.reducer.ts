import { CONSTANTS } from '../../config/constants';
import { AuthState } from '../../types';

interface Payload {
  type: string;
  payload: any;
}

export const initialState: AuthState = {
  loggedIn: false,
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
      };
    }
    case CONSTANTS.REGISTER_FAIL: {
      return {
        ...state,
      };
    }
    case CONSTANTS.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
