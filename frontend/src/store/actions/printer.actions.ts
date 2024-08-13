import { Dispatch } from 'redux';
import { CONSTANTS } from '../../config/constants';
import PrinterService from '../../services/printers.service';
import { MaintenanceRequest, Printer } from '../../types/printer.types';

export const getDepartmentPrinters =
  (depId: string) => async (dispatch: Dispatch) => {
    try {
      const printers = await PrinterService.getDepartmentPrinters(depId);
      dispatch({ type: CONSTANTS.GET_ALL_PRINTERS_SUCCESS, payload: printers });
    } catch (error) {
      dispatch({ type: CONSTANTS.GET_DEPARTMENT_PRINTERS_FAILURE });
      dispatch({ type: CONSTANTS.LOGOUT });
    }
  };

export const getDepartmentMetrics =
  (depId: string) => async (dispatch: Dispatch) => {
    try {
      const metrics = await PrinterService.getDepartmentMetrics(depId);
      dispatch({
        type: CONSTANTS.GET_DEPARTMENT_METRICS_SUCCESS,
        payload: metrics,
      });
    } catch (error) {
      dispatch({ type: CONSTANTS.GET_DEPARTMENT_PRINTERS_FAILURE });
    }
  };

export const getAllMetrics = () => async (dispatch: Dispatch) => {
  try {
    const metrics = await PrinterService.getAllMetrics();
    dispatch({
      type: CONSTANTS.GET_DEPARTMENT_METRICS_SUCCESS,
      payload: metrics,
    });
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_DEPARTMENT_PRINTERS_FAILURE });
  }
};

export const getAllPrinters = () => async (dispatch: Dispatch) => {
  try {
    const printers = await PrinterService.getAllPrinters();
    dispatch({
      type: CONSTANTS.GET_DEPARTMENT_PRINTERS_SUCCESS,
      payload: printers,
    });
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_DEPARTMENT_PRINTERS_FAILURE });
  }
};

export const selectPrinter = (selected: Printer) => (dispatch: Dispatch) => {
  dispatch({ type: CONSTANTS.SELECT_PRINTER, payload: selected });
};

export const updatePrinter =
  (printer: Printer) => async (dispatch: Dispatch) => {
    try {
      const result = await PrinterService.updatePrinter(printer);
      if (result)
        dispatch({ type: CONSTANTS.UPDATE_PRINTER_SUCCESS, payload: printer });
      else dispatch({ type: CONSTANTS.UPDATE_PRINTER_FAILURE });
    } catch (error) {
      dispatch({ type: CONSTANTS.UPDATE_PRINTER_FAILURE });
    }
  };

export const addPrinter = (printer: Printer) => async (dispatch: Dispatch) => {
  try {
    const result = await PrinterService.addPrinter(printer);
    if (result) {
      dispatch({ type: CONSTANTS.ADD_PRINTER_SUCCESS });
      return true;
    } else {
      dispatch({ type: CONSTANTS.ADD_PRINTER_FAILURE });
      return false;
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.ADD_PRINTER_FAILURE });
    return false;
  }
};

export const getJobHistory = (id?: string) => async (dispatch: Dispatch) => {
  try {
    const result = await PrinterService.getJobHistory(id);
    if (result) {
      dispatch({ type: CONSTANTS.GET_JOB_HISTORY_SUCESS, payload: result });
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

export const getDepartmentMaintenanceRequests =
  (depId: string) => async (dispatch: Dispatch) => {
    try {
      const requests = await PrinterService.getMaintenanceRequests(depId);
      if (requests.length > 0) {
        dispatch({
          type: CONSTANTS.GET_MAINTENANCE_REQUESTS_SUCCESS,
          payload: requests,
        });
      } else {
        dispatch({ type: CONSTANTS.GET_MAINTENANCE_REQUESTS_FAILURE });
      }
    } catch (error) {
      dispatch({ type: CONSTANTS.GET_MAINTENANCE_REQUESTS_FAILURE });
      dispatch({ type: CONSTANTS.LOGOUT });
    }
  };

export const getAllMaintenanceRequests = () => async (dispatch: Dispatch) => {
  try {
    const requests = await PrinterService.getAllMaintenanceRequests();
    if (requests.length > 0) {
      dispatch({
        type: CONSTANTS.GET_MAINTENANCE_REQUESTS_SUCCESS,
        payload: requests,
      });
    } else {
      dispatch({ type: CONSTANTS.GET_MAINTENANCE_REQUESTS_FAILURE });
    }
  } catch (error) {
    dispatch({ type: CONSTANTS.GET_MAINTENANCE_REQUESTS_FAILURE });
    dispatch({ type: CONSTANTS.LOGOUT });
  }
};

export const addMaintenanceRequest =
  (request: MaintenanceRequest) => async (dispatch: Dispatch) => {
    try {
      const result = await PrinterService.addMaintenanceRequest(request);
      if (result) dispatch({ type: CONSTANTS.ADD_MAINTENANCE_REQUEST_SUCCESS });
      else dispatch({ type: CONSTANTS.ADD_MAINTENANCE_REQUEST_FAILURE });
    } catch (error) {
      dispatch({ type: CONSTANTS.ADD_MAINTENANCE_REQUEST_FAILURE });
    }
  };

export const upDateMaintenanceRequestStatus =
  (id: string, status: string) => async (dispatch: Dispatch) => {
    try {
      const result = await PrinterService.updateMaintenanceRequest(id, status);
      if (result)
        dispatch({ type: CONSTANTS.UPDATE_MAINTENANCE_REQUEST_SUCCESS });
      else dispatch({ type: CONSTANTS.UPDATE_MAINTENANCE_REQUEST_FAILURE });
    } catch (error) {
      dispatch({ type: CONSTANTS.UPDATE_MAINTENANCE_REQUEST_FAILURE });
    }
  };
