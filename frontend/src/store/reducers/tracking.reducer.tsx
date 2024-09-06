import { PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import { TrackingState } from '../../types';

const initialTotals = {
  totalColor: 0,
  totalBw: 0,
  totalPaper: 0,
  totalJobs: 0,
  bwCharge: 0,
  colorCharge: 0,
  paperCharge: 0,
  totalCharge: 0,
};

export const initialState: TrackingState = {
  currentJobs: [],
  jobHistory: {},
  totals: initialTotals,
  billingPeriods: [],
  currentBillingPeriod: {
    id: '',
    year: '',
    month: '',
  },
};

const printerReducer = (state = initialState, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.GET_JOBS_SUCCESS: {
      return {
        ...state,
        currentJobs: payload,
      };
    }
    case CONSTANTS.GET_JOBS_FAILURE: {
      return {
        ...state,
        currentJobs: [],
      };
    }
    case CONSTANTS.GET_JOB_HISTORY_SUCCESS: {
      return {
        ...state,
        jobHistory: payload,
      };
    }
    case CONSTANTS.GET_JOB_HISTORY_FAILURE: {
      return {
        ...state,
        jobHistory: [],
      };
    }
    case CONSTANTS.GET_CURRENT_TOTALS_SUCCESS: {
      return {
        ...state,
        totals: payload,
      };
    }
    case CONSTANTS.GET_CURRENT_TOTALS_FAILURE: {
      return {
        ...state,
        totals: initialTotals,
      };
    }
    case CONSTANTS.GET_JOB_HISTORY_TOTALS_SUCCESS: {
      return {
        ...state,
        totals: payload,
      };
    }
    case CONSTANTS.GET_JOB_HISTORY_TOTALS_FAILURE: {
      return {
        ...state,
        totals: initialTotals,
      };
    }
    case CONSTANTS.GET_BILLING_PERIODS_SUCCESS: {
      return {
        ...state,
        billingPeriods: payload,
      };
    }
    case CONSTANTS.GET_BILLING_PERIODS_FAILURE: {
      return {
        ...state,
        billingPeriods: [],
      };
    }
    case CONSTANTS.GET_CURRENT_BILLING_PERIOD_SUCCESS: {
      return {
        ...state,
        currentBillingPeriod: payload,
      };
    }
    case CONSTANTS.GET_CURRENT_BILLING_PERIOD_FAILURE: {
      return {
        ...state,
        currentBillingPeriod: {
          id: '',
          year: '',
          month: '',
        },
      };
    }
    default:
      return state;
  }
};

export default printerReducer;
