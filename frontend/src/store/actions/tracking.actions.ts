import { Dispatch } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import TrackingService from '../../services/tracking.service';

export const getJobHistory = (id?: string) => async (dispatch: Dispatch) => {
  try {
    const result = await TrackingService.getJobHistory(id);
    if (result) {
      dispatch({ type: CONSTANTS.GET_JOB_HISTORY_SUCCESS, payload: result });
      return true;
    } else {
      dispatch({ type: CONSTANTS.GET_JOB_HISTORY_FAILURE });
      return false;
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_JOB_HISTORY_FAILURE });
    return false;
  }
};

export const getCurrentJobs = (id?: string) => async (dispatch: Dispatch) => {
  try {
    const result = await TrackingService.getCurrentJobs(id);
    if (result) {
      dispatch({ type: CONSTANTS.GET_JOBS_SUCCESS, payload: result });
      return true;
    } else {
      dispatch({ type: CONSTANTS.GET_JOBS_FAILURE });
      return false;
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_JOBS_FAILURE });
    return false;
  }
};
