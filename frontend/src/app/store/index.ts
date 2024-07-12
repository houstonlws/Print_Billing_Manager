import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  Middleware,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import storage from "redux-persist/es/storage";
import { PURGE, Persistor, persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import billingReducer from "./reducers/billing.reducer";
import maintenanceReducer from "./reducers/maintenance.reducer";
import printerReducer from "./reducers/printer.reducer";
import { dataReducer } from "./reducers/data.reducer";
import { CONSTANTS } from "./constants";

const { CLEAR_PERSIST, LOGOUT, FIFTEEN_MINUTES } = CONSTANTS;

const rootPersistConfig = {
  key: "root",
  storage,
};

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["updatedDataStatus"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  data: dataReducer,
  billing: billingReducer,
  maintenance: maintenanceReducer,
  printer: printerReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const clearPersistMiddleware: Middleware = (store) => (next) => (action) => {
  if (action.type === CLEAR_PERSIST) {
    store.dispatch({
      type: PURGE,
      result: () => {
        console.log("clearing persist");
      },
    });
  }
  return next(action);
};

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk, clearPersistMiddleware)),
);

const persistor: Persistor = persistStore(store);

const { dispatch } = store;

export const resetLogoutTimer = () => {
  clearTimeout((window as any).clearPersistTimeout);
  (window as any).clearPersistTimeout = setTimeout(() => {
    dispatch({
      type: LOGOUT,
      payload: undefined,
    });
    dispatch({
      type: CLEAR_PERSIST,
      payload: undefined,
    });
  }, FIFTEEN_MINUTES);
};

const events = ["click", "keypress", "mousemove", "scroll"];
events.forEach((event: any) => {
  window.addEventListener(event, resetLogoutTimer);
});

resetLogoutTimer();

export type AppDispatch = typeof dispatch;

export { store, persistor };
