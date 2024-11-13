import { Dispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CONSTANTS } from '../../../../config/constants';
import * as printerActions from '../../../../store/actions/printer.actions';
import { printers, printersMap, requests } from '../../shared/test.data';
import MaintenanceComponent from './maintenance.component';

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
      account: { user: { department_id: '1', type: CONSTANTS.USER } },
      printer: {
        printers: printers,
        requests: requests,
        printersMap: printersMap,
      },
    });
  });

  it('should render the component', () => {
    render(
      <Provider store={store}>
        <MaintenanceComponent></MaintenanceComponent>
      </Provider>
    );
    expect(screen.getByTestId('maintenance-component')).toBeInTheDocument();
  });
});
