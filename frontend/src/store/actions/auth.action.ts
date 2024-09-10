import { Dispatch } from 'redux';
import { CONSTANTS } from '../../config/constants';
import AuthService from '../../services/auth.service';
import { User } from '../../types';

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
        return true;
      } else {
        dispatch({ type: CONSTANTS.LOGIN_FAIL });
        return false;
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.LOGIN_FAIL });
      return false;
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
