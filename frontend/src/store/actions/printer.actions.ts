import { Dispatch } from 'redux';
import { CONSTANTS } from '../constants';
import PrinterService from '../../services/printers.service';
import { Printer } from '../../types/printer.types';

const {
  GET_DEPARTMENT_PRINTERS_SUCCESS,
  GET_DEPARTMENT_PRINTERS_FAILURE,
  GET_DEPARTMENT_METRICS_SUCCESS,
  SELECT_PRINTER,
  UPDATE_PRINTER_SUCCESS,
  UPDATE_PRINTER_FAILURE,
  DELETE_PRINTER_SUCCESS,
  DELETE_PRINTER_FAILURE,
  ADD_PRINTER_SUCCESS,
  ADD_PRINTER_FAILURE,
  GET_ALL_PRINTERS_SUCCESS,
  GET_ALL_PRINTERS_FAILURE,
  LOGOUT,
} = CONSTANTS;

export const getDepartmentPrinters = () => async (dispatch: Dispatch) => {
  try {
    const printers = await PrinterService.getDepartmentPrinters();
    dispatch({ type: GET_ALL_PRINTERS_SUCCESS, payload: printers });
  } catch (error) {
    dispatch({ type: GET_DEPARTMENT_PRINTERS_FAILURE });
    dispatch({ type: LOGOUT });
  }
};

export const getDepartmentMetrics =
  (printerIds: string[]) => async (dispatch: Dispatch) => {
    try {
      const metrics = await PrinterService.getDepartmentMetrics(printerIds);
      dispatch({ type: GET_DEPARTMENT_METRICS_SUCCESS, payload: metrics });
    } catch (error) {
      dispatch({ type: GET_ALL_PRINTERS_FAILURE });
      dispatch({ type: LOGOUT });
    }
  };

export const getAllPrinters = () => async (dispatch: Dispatch) => {
  try {
    const printers = await PrinterService.getAllPrinters();
    dispatch({ type: GET_DEPARTMENT_PRINTERS_SUCCESS, payload: printers });
  } catch (error) {
    dispatch({ type: GET_DEPARTMENT_PRINTERS_FAILURE });
    dispatch({ type: LOGOUT });
  }
};

export const selectPrinter = (selected: Printer) => (dispatch: Dispatch) => {
  dispatch({ type: SELECT_PRINTER, payload: selected });
};

export const updatePrinter =
  (printer: Printer) => async (dispatch: Dispatch) => {
    const result = await PrinterService.updatePrinter(printer);
    if (result) {
      dispatch({ type: UPDATE_PRINTER_SUCCESS });
    } else {
      dispatch({ type: UPDATE_PRINTER_FAILURE });
    }
  };

export const deletePrinter = (id: string) => async (dispatch: Dispatch) => {
  const result = await PrinterService.deletePrinter(id);
  if (result) {
    dispatch({ type: DELETE_PRINTER_SUCCESS });
  } else {
    dispatch({ type: DELETE_PRINTER_FAILURE });
  }
};

export const addPrinter = (printer: Printer) => async (dispatch: Dispatch) => {
  const result = await PrinterService.addPrinter(printer);
  if (result) {
    dispatch({ type: ADD_PRINTER_SUCCESS });
  } else {
    dispatch({ type: ADD_PRINTER_FAILURE });
  }
};
