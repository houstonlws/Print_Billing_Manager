import { Middleware } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../config/constants';
import { PURGE } from 'redux-persist/es/constants';

export const clearPersistMiddleware: Middleware =
  (store) => (next) => (action) => {
    if (action.type === CONSTANTS.CLEAR_PERSIST) {
      store.dispatch({
        type: PURGE,
        result: () => {
          console.debug('clearing persist');
        },
      });
    }
    return next(action);
  };
