import './index.css';
import './scss/custom.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import { store, persistor, resetLogoutTimer } from './store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

const events = ['click', 'keypress', 'mousemove', 'scroll'];
events.forEach((event: any) => {
  window.addEventListener(event, resetLogoutTimer);
});

resetLogoutTimer();
