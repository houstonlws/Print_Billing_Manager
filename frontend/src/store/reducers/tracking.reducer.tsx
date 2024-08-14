import { PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import { TrackingState } from '../../types';

export const initialState: TrackingState = {
  currentJobs: [],
  jobHistory: {},
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
    case CONSTANTS.GET_JOB_HISTORY_SUCESS: {
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
    default:
      return state;
  }
};

export default printerReducer;
