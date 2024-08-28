import { Dispatch } from '@reduxjs/toolkit';
import AdminService from '../../services/admin.service';
import { CONSTANTS } from '../../config/constants';
import { PriceConfig } from '../../types';

export const getPriceProfile = () => async (dispatch: Dispatch) => {
  try {
    const result = await AdminService.getPriceProfile();
    if (result) {
      dispatch({
        type: CONSTANTS.GET_ACTIVE_PRICE_SUCCESS,
        payload: result,
      });
      return true;
    } else return false;
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_ACTIVE_PRICE_FAILURE });
    return false;
  }
};

export const getPriceProfileList = () => async (dispatch: Dispatch) => {
  try {
    const result = await AdminService.getPriceProfileList();
    if (result) {
      dispatch({
        type: CONSTANTS.GET_PRICES_SUCCESS,
        payload: result,
      });
      return true;
    } else return false;
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_PRICES_FAILURE });
    return false;
  }
};

export const addPriceProfile =
  (profile: PriceConfig) => async (dispatch: Dispatch) => {
    try {
      const result = await AdminService.addPriceProfile(profile);
      if (result) {
        dispatch({
          type: CONSTANTS.ADD_PRICE_PROFILE_SUCCESS,
        });
        return true;
      } else return false;
    } catch (error) {
      dispatch({ type: CONSTANTS.ADD_PRICE_PROFILE_FAILURE });
      return false;
    }
  };

export const setPriceProfile = (id: string) => async (dispatch: Dispatch) => {
  try {
    const result = await AdminService.setPriceProfile(id);
    if (result) {
      dispatch({
        type: CONSTANTS.SET_ACTIVE_PRICE_PROFILE_SUCCESS,
        payload: result,
      });
      return true;
    } else return false;
  } catch (error) {
    dispatch({ type: CONSTANTS.SET_ACTIVE_PRICE_PROFILE_FAILURE });
    return false;
  }
};

export const updateUserType =
  (users: string[]) => async (dispatch: Dispatch) => {
    try {
      const result = await AdminService.updateUserType(users);
      if (result) {
        dispatch({ type: CONSTANTS.UPDATE_USER_TYPE_SUCCESS });
        return true;
      } else {
        dispatch({ type: CONSTANTS.UPDATE_USER_TYPE_FAILURE });
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.UPDATE_USER_TYPE_FAILURE });
    }
  };

export const getAllUsers = () => async (dispatch: Dispatch) => {
  try {
    const result = await AdminService.getAllUsers();
    if (result) {
      dispatch({
        type: CONSTANTS.GET_ALL_USERS_SUCCESS,
      });
      return result;
    } else {
      dispatch({ type: CONSTANTS.GET_ALL_USERS_FAILURE });
      dispatch({ type: CONSTANTS.LOGOUT });
      return false;
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_ALL_USERS_FAILURE });
    dispatch({ type: CONSTANTS.LOGOUT });
    return false;
  }
};
