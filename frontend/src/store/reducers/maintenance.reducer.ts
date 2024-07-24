import { PayloadAction } from '@reduxjs/toolkit';
import { MaintenanceState } from '../../types/maintenance.types';
import { CONSTANTS } from '../constants';

const initialState: MaintenanceState = {
  requests: [],
};

const {
  GET_MAINTENANCE_REQUESTS_SUCCESS,
  GET_MAINTENANCE_REQUESTS_FAILURE,
  ADD_MAINTENANCE_REQUEST_SUCCESS,
  ADD_MAINTENANCE_REQUEST_FAILURE,
} = CONSTANTS;

const maintenanceReducer = (state = initialState, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MAINTENANCE_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: payload,
      };
    }
    case GET_MAINTENANCE_REQUESTS_FAILURE: {
      return {
        ...state,
        requests: [],
      };
    }
    case ADD_MAINTENANCE_REQUEST_SUCCESS: {
      return {
        ...state,
      };
    }
    case ADD_MAINTENANCE_REQUEST_FAILURE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default maintenanceReducer;
