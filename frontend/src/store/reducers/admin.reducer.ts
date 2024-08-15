import { PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import { AdminState } from '../../types';

const initialState: AdminState = {
  users: [],
  priceProfiles: [],
  activeProfile: {
    id: '',
    name: '',
    bw_price: '',
    color_price: '',
    paper_price: '',
    is_active: '',
  },
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
    case CONSTANTS.GET_PRICES_SUCCESS: {
      return {
        ...state,
        priceProfiles: payload,
      };
    }
    case CONSTANTS.GET_PRICES_FAILURE: {
      return {
        ...state,
        priceProfiles: [],
      };
    }
    case CONSTANTS.GET_ACTIVE_PRICE_SUCCESS: {
      return {
        ...state,
        activeProfile: payload,
      };
    }
    case CONSTANTS.GET_ACTIVE_PRICE_FAILURE: {
      return {
        ...state,
        activeProfile: {},
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
