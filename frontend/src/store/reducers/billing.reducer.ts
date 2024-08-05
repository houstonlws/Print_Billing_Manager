import { PayloadAction } from '@reduxjs/toolkit';
import { BillingState } from '../../types/billing.types';
import { CONSTANTS } from '../../config/constants';

const initialState: BillingState = {
  billData: [],
  paymentHistory: [],
};

const billingReducer = (state = initialState, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.GET_DEPARTMENT_BILLING_HISTORY_SUCCESS: {
      return {
        ...state,
        billData: payload,
      };
    }
    case CONSTANTS.GET_DEPARTMENT_BILLING_HISTORY_FAILURE: {
      return {
        ...state,
        billData: [],
      };
    }
    case CONSTANTS.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export default billingReducer;
