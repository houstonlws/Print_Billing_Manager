import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as printerActions from '../../../../../store/actions/printer.actions';
import { MaintenanceRequest } from '../../../../../types/printer.types';
import ReportIssueComponent from './report-issue.component';

const mockStore = configureStore([thunk]);
let store = mockStore({
  account: { user: {} },
  printer: { printers: [] },
});
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
    render(
      <Provider store={store}>
        <ReportIssueComponent></ReportIssueComponent>
      </Provider>
    );
    expect(screen.getByTestId(`report-issue-root`)).toBeInTheDocument();
  });

  it('should update fields on text input', () => {
    render(
      <Provider store={store}>
        <ReportIssueComponent></ReportIssueComponent>
      </Provider>
    );

    const button = screen.getByTestId('report-toggler');
    fireEvent.click(button);

    const maintenance_type = screen.getByTestId('maintenance_type');
    const description = screen.getByPlaceholderText(/description/i);

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
    render(
      <Provider store={store}>
        <ReportIssueComponent></ReportIssueComponent>
      </Provider>
    );

    const button = screen.getByTestId('report-toggler');
    fireEvent.click(button);

    const maintenance_type = screen.getByTestId('maintenance_type');
    const description = screen.getByPlaceholderText(/description/i);

    const expectedmaintenance_type = 'Paper Jam';
    const expecteddescription = 'paper in the machine';

    fireEvent.change(maintenance_type, {
      target: { value: expectedmaintenance_type },
    });
    fireEvent.change(description, { target: { value: expecteddescription } });

    const submit = screen.getByTestId('submit-report');
    fireEvent.click(submit);

    await waitFor(() => {
      expect(store.getActions()).toEqual([]);
    });
  });
});
