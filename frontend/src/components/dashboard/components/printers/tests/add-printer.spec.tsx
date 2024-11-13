import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CONSTANTS } from '../../../../../config/constants';
import * as printerActions from '../../../../../store/actions/printer.actions';
import { initialState } from '../../../../../store/reducers/printer.reducer';
import { Printer } from '../../../../../types';
import { printers } from '../../../shared/test.data';
import AddPrinterComponent from '../components/add-printer.component';

const mockStore = configureStore([thunk]);
let store = mockStore({
  printer: initialState,
  account: { user: { department_id: '1' } },
});
const printer = printers[0] as unknown as Printer;
const mockUpdatePrinter = jest.fn(
  (printer: Printer) => async (dispatch: Dispatch) => {
    return Promise.resolve();
  }
);
jest
  .spyOn(printerActions, 'updatePrinter')
  .mockImplementation(mockUpdatePrinter);

describe('Add printer tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should render the component', () => {
    render(
      <Provider store={store}>
        <AddPrinterComponent departmentId='1'></AddPrinterComponent>
      </Provider>
    );
    expect(screen.getByTestId(`addprinter`)).toBeInTheDocument();
  });

  it('should call the edit printer action on form submit', async () => {
    render(
      <Provider store={store}>
        <AddPrinterComponent departmentId='1'></AddPrinterComponent>
      </Provider>
    );

    const toggle = screen.getByTestId('toggle-add');
    fireEvent.click(toggle);

    const button = screen.getByTestId('submit-add');
    fireEvent.click(button);

    const expected = [{ type: CONSTANTS.ADD_PRINTER_FAILURE }];

    await waitFor(() => {
      expect(store.getActions()).toEqual([]);
    });
  });
});
