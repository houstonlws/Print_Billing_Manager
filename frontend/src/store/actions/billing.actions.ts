import { Dispatch } from 'redux';
import BillingService from '../../services/billing.service';
import { CONSTANTS } from '../../config/constants';

export const getDepartmentBillingHistory =
  (depId: string | number) => async (dispatch: Dispatch) => {
    try {
      const result = await BillingService.getDepartmentBillingHistory(depId);
      if (result) {
        dispatch({
          type: CONSTANTS.GET_DEPARTMENT_BILLING_HISTORY_SUCCESS,
          payload: result,
        });
      } else {
        dispatch({
          type: CONSTANTS.GET_DEPARTMENT_BILLING_HISTORY_FAILURE,
          payload: undefined,
        });
        dispatch({ type: CONSTANTS.LOGOUT });
      }
    } catch (error) {
      dispatch({
        type: CONSTANTS.GET_DEPARTMENT_BILLING_HISTORY_FAILURE,
        payload: undefined,
      });
      dispatch({ type: CONSTANTS.LOGOUT });
    }
  };
