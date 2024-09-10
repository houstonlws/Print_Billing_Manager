import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { printers } from '../../../shared/test.data';
import {
  MaintenanceRequest,
  Printer,
} from '../../../../../types/printer.types';
import { Dispatch } from 'redux';
import * as printerActions from '../../../../../store/actions/printer.actions';
import { CONSTANTS } from '../../../../../config/constants';
import ReportIssueComponent from './report-issue.component';

const mockStore = configureStore([thunk]);
let store = mockStore({
  account: { user: {} },
  printer: { printers: [] },
});
const printer = printers[0] as unknown as Printer;
const mockAddMaintenanceRequest = jest.fn(
  (request: MaintenanceRequest) => async (dispatch: Dispatch) => {
    return Promise.resolve();
  }
);
jest
  .spyOn(printerActions, 'addMaintenanceRequest')
  .mockImplementation(mockAddMaintenanceRequest);

describe('Report Issue tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ReportIssueComponent></ReportIssueComponent>
      </Provider>
    );
    expect(getByTestId(`report-issue-root`)).toBeInTheDocument();
  });

  it(' should update fields on text input', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <ReportIssueComponent></ReportIssueComponent>
      </Provider>
    );

    const button = getByTestId('report-toggler');
    fireEvent.click(button);

    const maintenance_type = getByTestId('maintenance_type');
    const description = getByPlaceholderText(/description/i);

    const expectedmaintenance_type = 'Paper Jam';
    const expecteddescription = 'paper in the machine';

    fireEvent.change(maintenance_type, {
      target: { value: expectedmaintenance_type },
    });
    fireEvent.change(description, { target: { value: expecteddescription } });

    expect(maintenance_type).toHaveValue(expectedmaintenance_type);
    expect(description).toHaveValue(expecteddescription);
  });

  it('should call the add maintenance request action on form submit', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <ReportIssueComponent></ReportIssueComponent>
      </Provider>
    );

    const button = getByTestId('report-toggler');
    fireEvent.click(button);

    const maintenance_type = getByTestId('maintenance_type');
    const description = getByPlaceholderText(/description/i);

    const expectedmaintenance_type = 'Paper Jam';
    const expecteddescription = 'paper in the machine';

    fireEvent.change(maintenance_type, {
      target: { value: expectedmaintenance_type },
    });
    fireEvent.change(description, { target: { value: expecteddescription } });

    const submit = getByTestId('submit-report');
    fireEvent.click(submit);

    const expected = [{ type: CONSTANTS.ADD_MAINTENANCE_REQUEST_FAILURE }];

    await waitFor(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
