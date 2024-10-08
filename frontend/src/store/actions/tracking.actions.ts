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

export const getCurrentTotals = (id?: string) => async (dispatch: Dispatch) => {
  try {
    const result = await TrackingService.getCurrentTotals(id);
    if (result) {
      dispatch({ type: CONSTANTS.GET_CURRENT_TOTALS_SUCCESS, payload: result });
      return true;
    } else {
      dispatch({ type: CONSTANTS.GET_CURRENT_TOTALS_FAILURE });
      return false;
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_CURRENT_TOTALS_FAILURE });
    return false;
  }
};

export const getJobHistoryTotals =
  (id?: string) => async (dispatch: Dispatch) => {
    try {
      const result = await TrackingService.getJobHistoryTotals(id);
      if (result) {
        dispatch({
          type: CONSTANTS.GET_JOB_HISTORY_TOTALS_SUCCESS,
          payload: result,
        });
        return true;
      } else {
        dispatch({ type: CONSTANTS.GET_JOB_HISTORY_TOTALS_FAILURE });
        return false;
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.GET_JOB_HISTORY_TOTALS_FAILURE });
      return false;
    }
  };

export const getBillingPeriods =
  (id?: string) => async (dispatch: Dispatch) => {
    try {
      const result = await TrackingService.getBillingPeriods(id);
      if (result) {
        dispatch({
          type: CONSTANTS.GET_BILLING_PERIODS_SUCCESS,
          payload: result,
        });
        return true;
      } else {
        dispatch({ type: CONSTANTS.GET_JOB_HISTORY_TOTALS_FAILURE });
        return false;
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.GET_JOB_HISTORY_TOTALS_FAILURE });
      return false;
    }
  };

export const getCurrentBillingPeriod =
  (id?: string) => async (dispatch: Dispatch) => {
    try {
      const result = await TrackingService.getCurrentBillingPeriod();
      if (result) {
        dispatch({
          type: CONSTANTS.GET_CURRENT_BILLING_PERIOD_SUCCESS,
          payload: result,
        });
        return true;
      } else {
        dispatch({ type: CONSTANTS.GET_CURRENT_BILLING_PERIOD_FAILURE });
        return false;
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.GET_CURRENT_BILLING_PERIOD_FAILURE });
      return false;
    }
  };

export const getJobsByBillingPeriod =
  (bpId: string, depId?: string) => async (dispatch: Dispatch) => {
    try {
      const result = await TrackingService.getJobsByBillingPeriod(bpId, depId);
      if (result) {
        dispatch({
          type: CONSTANTS.GET_JOBS_SUCCESS,
          payload: result,
        });
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
