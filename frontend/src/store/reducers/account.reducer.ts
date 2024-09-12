import { CONSTANTS } from '../../config/constants';
import { AccountState } from '../../types';

interface Payload {
  type: string;
  payload: any;
}

export const initialState: AccountState = {
  user: {
    id: '',
    email: '',
    type: '',
    department_id: '',
  },
  notifications: [],
};

export const accountReducer = (state = initialState, action: Payload) => {
  const { type, payload } = action;
  switch (action.type) {
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
    case CONSTANTS.UPDATE_USER_DATA_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }
    case CONSTANTS.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }
    case CONSTANTS.LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload,
      };
    }
    case CONSTANTS.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};
