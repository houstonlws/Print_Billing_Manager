import { Dispatch } from 'redux';
import { CONSTANTS } from '../../config/constants';
import AuthService from '../../services/auth.service';
import { PriceConfig, User } from '../../types/auth.types';

export const register =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const result = await AuthService.register(email, password);
      if (result) {
        dispatch({ type: CONSTANTS.REGISTER_SUCCESS });
        return true;
      } else {
        dispatch({ type: CONSTANTS.REGISTER_FAIL });
        return false;
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.REGISTER_FAIL });
      return false;
    }
  };

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const result: User = await AuthService.login(email, password);
      if (result) {
        dispatch({ type: CONSTANTS.LOGIN_SUCCESS, payload: result });
      } else {
        dispatch({ type: CONSTANTS.LOGIN_FAIL });
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.LOGIN_FAIL });
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  localStorage.removeItem('accessToken');
  dispatch({ type: CONSTANTS.CLEAR_PERSIST });
  dispatch({ type: CONSTANTS.LOGOUT });
};

export const refreshToken = () => async (dispatch: Dispatch) => {
  try {
    const result = await AuthService.refreshToken();
    if (result) {
      dispatch({ type: CONSTANTS.REFRESH_TOKEN_SUCCESS, payload: result });
    } else {
      dispatch({ type: CONSTANTS.REFRESH_TOKEN_FAILURE });
      dispatch({ type: CONSTANTS.CLEAR_PERSIST });
      dispatch({ type: CONSTANTS.LOGOUT });
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.REFRESH_TOKEN_FAILURE });
    dispatch({ type: CONSTANTS.CLEAR_PERSIST });
    dispatch({ type: CONSTANTS.LOGOUT });
  }
};

export const getUserData = (id: string) => async (dispatch: Dispatch) => {
  try {
    const result = await AuthService.getUserData(id);
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

export const addPriceProfile =
  (profile: PriceConfig) => async (dispatch: Dispatch) => {
    try {
      const result = await AuthService.addPriceProfile(profile);
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
    const result = await AuthService.setPriceProfile(id);
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

export const getAllData = () => async (dispatch: Dispatch) => {
  try {
    const result = await AuthService.getAllData();
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
        type: CONSTANTS.GET_DEPARTMENT_METRICS_SUCCESS,
        payload: result.department_metrics,
      });
      dispatch({
        type: CONSTANTS.GET_DEPARTMENT_BILLING_HISTORY_SUCCESS,
        payload: result.billing,
      });
      dispatch({
        type: CONSTANTS.GET_USERS_SUCCESS,
        payload: result.users,
      });
      dispatch({
        type: CONSTANTS.GET_JOBS_SUCCESS,
        payload: result.jobs,
      });
      dispatch({
        type: CONSTANTS.GET_PRICES_SUCCESS,
        payload: result.prices,
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
    const result = await AuthService.getAllDataUser(depId);
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
        type: CONSTANTS.GET_DEPARTMENT_BILLING_HISTORY_SUCCESS,
        payload: result.billing,
      });
      dispatch({
        type: CONSTANTS.GET_DEPARTMENT_METRICS_SUCCESS,
        payload: result.department_metrics,
      });
      dispatch({
        type: CONSTANTS.GET_JOBS_SUCCESS,
        payload: result.jobs,
      });
      dispatch({
        type: CONSTANTS.GET_PRICES_SUCCESS,
        payload: result.prices,
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
    const result = await AuthService.updateUserData(data);
    if (result) {
      dispatch({ type: CONSTANTS.UPDATE_USER_DATA_SUCCESS, payload: result });
      return true;
    } else return false;
  } catch (error) {
    dispatch({ type: CONSTANTS.UPDATE_USER_DATA_FAILURE });
    return false;
  }
};

export const getAllUsers = () => async (dispatch: Dispatch) => {
  try {
    const result = await AuthService.getAllUsers();
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

export const getNotifications =
  (departmentId: string) => async (dispatch: Dispatch) => {
    try {
      const result = await AuthService.getNotifications(departmentId);
      dispatch({ type: CONSTANTS.GET_NOTIFICATIONS_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: CONSTANTS.GET_NOTIFICATIONS_FAILURE });
      dispatch({ type: CONSTANTS.LOGOUT });
    }
  };

const clearCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`)!;
  if (parts.length === 2) {
    const cookieVal = parts.pop()?.split(';').shift();
    return cookieVal || null;
  }
  return null;
};

export const updateUserType =
  (users: string[]) => async (dispatch: Dispatch) => {
    try {
      const result = await AuthService.updateUserType(users);
      if (result) {
        dispatch({ type: CONSTANTS.UPDATE_USER_TYPE_SUCCESS });
        return true;
      } else {
        dispatch({ type: CONSTANTS.UPDATE_USER_TYPE_FAILURE });
        dispatch({ type: CONSTANTS.LOGOUT });
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.UPDATE_USER_TYPE_FAILURE });
      dispatch({ type: CONSTANTS.LOGOUT });
    }
  };
