import { PayloadAction } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import { Printer, PrinterState, TypeMap } from '../../types';

export const initialState: PrinterState = {
  printers: [],
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

const populateMap = (arr: any[]): TypeMap<Printer> => {
  let map: TypeMap<Printer> = {};
  for (const o of arr) {
    map[o.id] = o;
  }
  return map;
};

export default printerReducer;
