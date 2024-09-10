import { Dispatch } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import AccountService from '../../services/account.service';
import { User } from '../../types';

export const getUserData = (id: string) => async (dispatch: Dispatch) => {
  try {
    const result = await AccountService.getUserData(id);
    if (result?.status === 200) {
      dispatch({
        type: CONSTANTS.GET_USER_DATA_SUCCESS,
        payload: result?.data,
      });
    } else {
      dispatch({ type: CONSTANTS.GET_USER_DATA_FAIL });
      dispatch({ type: CONSTANTS.LOGOUT });
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_USER_DATA_FAIL });
    dispatch({ type: CONSTANTS.LOGOUT });
  }
};

export const getAllData = () => async (dispatch: Dispatch) => {
  try {
    const result = await AccountService.getAllData();
    if (result) {
      dispatch({
        type: CONSTANTS.GET_NOTIFICATIONS_SUCCESS,
        payload: result.notifications,
      });
      dispatch({
        type: CONSTANTS.GET_ALL_PRINTERS_SUCCESS,
        payload: result.printers,
      });
      dispatch({
        type: CONSTANTS.GET_MAINTENANCE_REQUESTS_SUCCESS,
        payload: result.maintenance_requests,
      });
      dispatch({
        type: CONSTANTS.GET_USERS_SUCCESS,
        payload: result.users,
      });
      dispatch({
        type: CONSTANTS.GET_JOBS_SUCCESS,
        payload: result.jobs,
      });
      return true;
    } else return false;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

export const getAllDataUser = (depId: string) => async (dispatch: Dispatch) => {
  try {
    const result = await AccountService.getAllDataUser(depId);
    if (result) {
      dispatch({
        type: CONSTANTS.GET_NOTIFICATIONS_SUCCESS,
        payload: result.notifications,
      });
      dispatch({
        type: CONSTANTS.GET_ALL_PRINTERS_SUCCESS,
        payload: result.printers,
      });
      dispatch({
        type: CONSTANTS.GET_MAINTENANCE_REQUESTS_SUCCESS,
        payload: result.maintenance_requests,
      });
      dispatch({
        type: CONSTANTS.GET_JOBS_SUCCESS,
        payload: result.jobs,
      });
      dispatch({
        type: CONSTANTS.GET_ACTIVE_PRICE_SUCCESS,
        payload: result.price[0],
      });
      return true;
    } else return false;
  } catch (error) {
    dispatch({ type: CONSTANTS.UPDATE_USER_DATA_FAILURE });
    return false;
  }
};

export const updateUserData = (data: User) => async (dispatch: Dispatch) => {
  try {
    const result = await AccountService.updateUserData(data);
    if (result) {
      dispatch({ type: CONSTANTS.UPDATE_USER_DATA_SUCCESS, payload: result });
      return true;
    } else return false;
  } catch (error) {
    dispatch({ type: CONSTANTS.UPDATE_USER_DATA_FAILURE });
    return false;
  }
};

export const getNotifications =
  (departmentId?: string, unread?: boolean) => async (dispatch: Dispatch) => {
    try {
      const result = await AccountService.getNotifications(
        departmentId,
        unread
      );
      if (unread) return result;
      else
        dispatch({
          type: CONSTANTS.GET_NOTIFICATIONS_SUCCESS,
          payload: result,
        });
    } catch (error) {
      dispatch({ type: CONSTANTS.GET_NOTIFICATIONS_FAILURE });
      dispatch({ type: CONSTANTS.LOGOUT });
    }
  };
