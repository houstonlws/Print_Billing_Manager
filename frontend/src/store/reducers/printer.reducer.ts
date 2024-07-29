import { PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';

export const initialState = {
  printers: [],
  metrics: [],
  requests: [],
};

const printerReducer = (state = initialState, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case CONSTANTS.GET_DEPARTMENT_PRINTERS: {
      return {
        ...state,
      };
    }
    case CONSTANTS.GET_DEPARTMENT_PRINTERS_SUCCESS: {
      return {
        ...state,
        printers: payload,
      };
    }
    case CONSTANTS.GET_DEPARTMENT_PRINTERS_FAILURE: {
      return {
        ...state,
        printers: [],
      };
    }
    case CONSTANTS.GET_ALL_PRINTERS: {
      return {
        ...state,
      };
    }
    case CONSTANTS.GET_ALL_PRINTERS_SUCCESS: {
      return {
        ...state,
        printers: payload,
      };
    }
    case CONSTANTS.GET_ALL_PRINTERS_FAILURE: {
      return {
        ...state,
        printers: [],
      };
    }
    case CONSTANTS.GET_DEPARTMENT_METRICS_SUCCESS: {
      return {
        ...state,
        metrics: payload,
      };
    }
    case CONSTANTS.GET_DEPARTMENT_METRICS_FAILURE: {
      return {
        ...state,
        metrics: [],
      };
    }
    case CONSTANTS.SELECT_PRINTER: {
      return {
        ...state,
        selected: payload,
      };
    }
    case CONSTANTS.GET_MAINTENANCE_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: payload,
      };
    }
    case CONSTANTS.GET_MAINTENANCE_REQUESTS_FAILURE: {
      return {
        ...state,
        requests: [],
      };
    }
    case CONSTANTS.ADD_MAINTENANCE_REQUEST_SUCCESS: {
      return {
        ...state,
      };
    }
    case CONSTANTS.ADD_MAINTENANCE_REQUEST_FAILURE: {
      return {
        ...state,
      };
    }
    case CONSTANTS.UPDATE_MAINTENANCE_REQUEST_SUCCESS: {
      return {
        ...state,
      };
    }
    case CONSTANTS.UPDATE_MAINTENANCE_REQUEST_FAILURE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default printerReducer;
