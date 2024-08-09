import { PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import { Printer, PrinterState } from '../../types/printer.types';
import { Map } from '../../types/app.types';

export const initialState: PrinterState = {
  printers: [],
  metrics: [],
  requests: [],
  printersMap: {},
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
      let map = {};
      if (payload !== null && typeof payload === 'object') {
        map = populateMap(payload);
      }
      return {
        ...state,
        printers: payload,
        printersMap: map,
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
      let map = {};
      if (payload !== null && typeof payload === 'object') {
        map = populateMap(payload);
      }
      return {
        ...state,
        printers: payload,
        printersMap: map,
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
    case CONSTANTS.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

const populateMap = (arr: Printer[]): Map<Printer> => {
  let map: Map<Printer> = {};
  for (const o of arr) {
    map[o.id] = o;
  }
  return map;
};

export default printerReducer;
