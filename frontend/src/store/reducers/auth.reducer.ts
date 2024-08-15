import { CONSTANTS } from '../../config/constants';
import { AuthState } from '../../types';

interface Payload {
  type: string;
  payload: any;
}

export const initialState: AuthState = {
  loggedIn: false,
  user: {
    id: '',
    email: '',
    type: '',
    department_id: '',
  },
  notifications: [],
};

export const authReducer = (state = initialState, action: Payload) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: payload,
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
        user: payload,
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
    case CONSTANTS.GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        loggedIn: true,
        user: payload,
      };
    }
    case CONSTANTS.GET_USER_DATA_FAIL: {
      return initialState;
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
    case CONSTANTS.GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
      };
    }
    case CONSTANTS.UPDATE_USER_DATA_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }
    default:
      return state;
  }
};
