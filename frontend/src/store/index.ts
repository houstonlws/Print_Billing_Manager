import {  legacy_createStore as createStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from 'redux-persist/es/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk'
import auth from '../modules/auth/utilities/auth.reducer'
import dashboard from '../modules/dashboard/utilities/dashboard.reducer'

const rootPersistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    auth: auth,
    dashboard: dashboard
})

const persistedReducer = persistReducer(rootPersistConfig,rootReducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store

export const persistor = persistStore(store)


export type AppDispatch = typeof store.dispatch;