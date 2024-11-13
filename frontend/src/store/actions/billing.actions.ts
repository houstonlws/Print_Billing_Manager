import { Dispatch } from 'redux';
import BillingService from '../../services/billing.service';
import { CONSTANTS } from '../../config/constants';

export const getDepartmentInvoiceHistory =
  (depId?: string) => async (dispatch: Dispatch) => {
    try {
      const result = await BillingService.getDepartmentInvoiceHistory(depId);
      if (result) {
        dispatch({
          type: CONSTANTS.GET_DEPARTMENT_INVOICE_HISTORY_SUCCESS,
          payload: result,
        });
      } else {
        dispatch({
          type: CONSTANTS.GET_DEPARTMENT_INVOICE_HISTORY_FAILURE,
          payload: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: CONSTANTS.GET_DEPARTMENT_INVOICE_HISTORY_FAILURE,
        payload: undefined,
      });
    }
  };

export const getCurrentInvoice =
  (depId?: string) => async (dispatch: Dispatch) => {
    try {
      const result = await BillingService.getCurrentInvoice(depId);
      if (result) {
        dispatch({
          type: CONSTANTS.GET_CURRENT_INVOICE_SUCCESS,
          payload: result,
        });
      } else {
        dispatch({
          type: CONSTANTS.GET_CURRENT_INVOICE_FAILURE,
          payload: undefined,
        });
      }
    } catch (error) {
      dispatch({
        type: CONSTANTS.GET_CURRENT_INVOICE_FAILURE,
        payload: undefined,
      });
    }
  };
