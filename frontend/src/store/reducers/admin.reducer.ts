import { PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import { AdminState } from '../../types/auth.types';

const initialState: AdminState = {
  users: [],
};

const adminReducer = (state = initialState, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.GET_USERS_SUCCESS: {
      return {
        ...state,
        users: payload,
      };
    }
    case CONSTANTS.GET_USERS_FAILURE: {
      return {
        ...state,
        users: [],
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
