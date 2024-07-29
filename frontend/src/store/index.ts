import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/es/storage';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/auth.reducer';
import billingReducer from './reducers/billing.reducer';
import printerReducer from './reducers/printer.reducer';
import { CONSTANTS } from '../config/constants';
import { clearPersistMiddleware } from './middleware/persist.middleware';

const rootPersistConfig = {
  key: 'root',
  storage,
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['updatedDataStatus'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  billing: billingReducer,
  printer: printerReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, clearPersistMiddleware))
);

const persistor: Persistor = persistStore(store);

const { dispatch } = store;

export const resetLogoutTimer = () => {
  clearTimeout((window as any).clearPersistTimeout);
  (window as any).clearPersistTimeout = setTimeout(() => {
    dispatch({
      type: CONSTANTS.LOGOUT,
      payload: undefined,
    });
    dispatch({
      type: CONSTANTS.CLEAR_PERSIST,
      payload: undefined,
    });
  }, CONSTANTS.FIFTEEN_MINUTES);
};

export type AppDispatch = typeof dispatch;

export { store, persistor };
