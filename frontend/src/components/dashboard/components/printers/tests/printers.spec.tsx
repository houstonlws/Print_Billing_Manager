import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import PrintersComponent from '../printers.component';
import { printers } from '../../../shared/test.data';
import { CONSTANTS } from '../../../../../config/constants';

const mockStore = configureStore([thunk]);
let store = mockStore({});

describe('Printer tests', () => {
  beforeEach(() => {
    store = mockStore({
      account: { user: { type: CONSTANTS.USER } },
      printer: { printers: printers },
    });
  });

  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <PrintersComponent departmentId='1'></PrintersComponent>
      </Provider>
    );
    expect(getByTestId('printers-component')).toBeInTheDocument();
  });

  it('should allow an admin to add a printer', () => {
    store = mockStore({ account: { user: { type: CONSTANTS.ADMIN } } });

    const { getByTestId } = render(
      <Provider store={store}>
        <PrintersComponent departmentId='1'></PrintersComponent>
      </Provider>
    );
    expect(getByTestId('addprinter')).toBeInTheDocument();
  });

  it('should not allow a user to add a printer', () => {
    store = mockStore({ account: { user: { type: CONSTANTS.USER } } });

    const { queryByTestId } = render(
      <Provider store={store}>
        <PrintersComponent departmentId='1'></PrintersComponent>
      </Provider>
    );
    expect(queryByTestId('addprinter')).toBeNull();
  });

  it('should allow admin to edit printers', () => {
    store = mockStore({
      account: { user: { type: CONSTANTS.ADMIN } },
      printer: { printers: printers },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <PrintersComponent departmentId='1'></PrintersComponent>
      </Provider>
    );

    printers.forEach((p) => {
      expect(getByTestId(`edit-printer-${p.id}`)).toBeInTheDocument();
    });
  });
});
