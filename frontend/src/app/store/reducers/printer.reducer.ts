import { PayloadAction } from "@reduxjs/toolkit";
import { CONSTANTS } from "../constants";

const {
  GET_DEPARTMENT_PRINTERS,
  GET_DEPARTMENT_PRINTERS_SUCCESS,
  GET_DEPARTMENT_PRINTERS_FAILURE,
  GET_ALL_PRINTERS,
  GET_ALL_PRINTERS_SUCCESS,
  GET_ALL_PRINTERS_FAILURE,
  GET_DEPARTMENT_METRICS_SUCCESS,
  GET_DEPARTMENT_METRICS_FAILURE,
  SELECT_PRINTER,
} = CONSTANTS;

const initialState = {
  loading: true,
  printers: [],
  metrics: [],
  selected: null,
};

const printerReducer = (state = initialState, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DEPARTMENT_PRINTERS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DEPARTMENT_PRINTERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        printers: payload,
      };
    }
    case GET_DEPARTMENT_PRINTERS_FAILURE: {
      return {
        ...state,
        loading: false,
        printers: [],
      };
    }
    case GET_ALL_PRINTERS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ALL_PRINTERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        printers: payload,
      };
    }
    case GET_ALL_PRINTERS_FAILURE: {
      return {
        ...state,
        loading: false,
        printers: [],
      };
    }
    case GET_DEPARTMENT_METRICS_SUCCESS: {
      return {
        ...state,
        loading: false,
        metrics: payload,
      };
    }
    case GET_DEPARTMENT_METRICS_FAILURE: {
      return {
        ...state,
        loading: false,
        metrics: [],
      };
    }
    case SELECT_PRINTER: {
      return {
        ...state,
        selected: payload,
      };
    }
    default:
      return state;
  }
};

export default printerReducer;
