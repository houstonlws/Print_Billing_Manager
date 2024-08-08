import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { printers } from '../tracking/tests/test.data';
import { CONSTANTS } from '../../../../config/constants';
import MaintenanceComponent from './maintenance.component';
import { requests } from './test.data';
import { Dispatch } from '@reduxjs/toolkit';
import * as printerActions from '../../../../store/actions/printer.actions';

const mockStore = configureStore([thunk]);
let store = mockStore({});
const mockUpdateRequest = jest.fn(
  (id: string, status: string) => async (dispatch: Dispatch) => {
    return Promise.resolve();
  }
);
jest
  .spyOn(printerActions, 'upDateMaintenanceRequestStatus')
  .mockImplementation(mockUpdateRequest);
describe('Maintenance tests', () => {
  beforeEach(() => {
    store = mockStore({
      auth: { user: { type: CONSTANTS.USER } },
      printer: { printers: printers },
    });
  });

  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MaintenanceComponent></MaintenanceComponent>
      </Provider>
    );
    expect(getByTestId('maintenance-component')).toBeInTheDocument();
  });

  it('should display all maintenance requests for selected departments', () => {
    store = mockStore({
      auth: { user: { type: CONSTANTS.USER } },
      printer: { printers: printers, requests: requests },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MaintenanceComponent></MaintenanceComponent>
      </Provider>
    );

    requests.forEach((r) =>
      expect(getByTestId(`maintenance-item-${r.id}`)).toBeInTheDocument()
    );
  });
});
