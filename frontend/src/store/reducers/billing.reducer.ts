import { PayloadAction } from '@reduxjs/toolkit';
import { BillingState } from '../../types';
import { CONSTANTS } from '../../config/constants';

const initialState: BillingState = {
  currentInvoice: {
    id: '',
    department_id: '',
    month: '',
    year: '',
    price_profile_id: '',
    bw_charge: '',
    color_charge: '',
    paper_charge: '',
    status: '',
  },
  invoiceHistory: [],
};

const billingReducer = (state = initialState, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.GET_CURRENT_INVOICE_SUCCESS: {
      return {
        ...state,
        currentInvoice: payload,
      };
    }
    case CONSTANTS.GET_CURRENT_INVOICE_FAILURE: {
      return {
        ...state,
        currentInvoice: initialState.currentInvoice,
      };
    }
    case CONSTANTS.GET_DEPARTMENT_INVOICE_HISTORY_SUCCESS: {
      return {
        ...state,
        invoiceHistory: payload,
      };
    }
    case CONSTANTS.GET_DEPARTMENT_INVOICE_HISTORY_FAILURE: {
      return {
        ...state,
        invoiceHistory: [],
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
