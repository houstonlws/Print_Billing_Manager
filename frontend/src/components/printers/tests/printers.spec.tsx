import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PrintersComponent from '../printers.component';
import { printers } from '../../tracking/tests/test.data';
import { CONSTANTS } from '../../../config/constants';

const mockStore = configureStore([thunk]);
let store = mockStore({});

describe('Printer tests', () => {
  beforeEach(() => {
    store = mockStore({
      auth: { user: { type: CONSTANTS.USER } },
      printer: { printers: printers },
    });
  });

  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <PrintersComponent></PrintersComponent>
      </Provider>
    );
    expect(getByTestId('printers-component')).toBeInTheDocument();
  });

  it('should allow an admin to add a printer', () => {
    store = mockStore({ auth: { user: { type: CONSTANTS.ADMIN } } });

    const { getByTestId } = render(
      <Provider store={store}>
        <PrintersComponent></PrintersComponent>
      </Provider>
    );
    expect(getByTestId('addprinter')).toBeInTheDocument();
  });

  it('should not allow a user to add a printer', () => {
    store = mockStore({ auth: { user: { type: CONSTANTS.USER } } });

    const { queryByTestId } = render(
      <Provider store={store}>
        <PrintersComponent></PrintersComponent>
      </Provider>
    );
    expect(queryByTestId('addprinter')).toBeNull();
  });

  it('should allow admin to edit printers', () => {
    store = mockStore({
      auth: { user: { type: CONSTANTS.ADMIN } },
      printer: { printers: printers },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <PrintersComponent></PrintersComponent>
      </Provider>
    );

    printers.forEach((p) => {
      expect(getByTestId(`edit-printer-${p.id}`)).toBeInTheDocument();
    });
  });

  it('should allow anyone to report issue with printer', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <PrintersComponent></PrintersComponent>
      </Provider>
    );

    printers.forEach((p) => {
      expect(getByTestId(`report-issue-${p.id}`)).toBeInTheDocument();
    });
  });
});
