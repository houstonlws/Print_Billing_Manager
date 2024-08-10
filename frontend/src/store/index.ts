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
import { clearPersistMiddleware } from './middleware/persist.middleware';
import adminReducer from './reducers/admin.reducer';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  billing: billingReducer,
  printer: printerReducer,
  admin: adminReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, clearPersistMiddleware))
);

const persistor: Persistor = persistStore(store);

const { dispatch } = store;

export type AppDispatch = typeof dispatch;

export { store, persistor };
