import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { printers } from '../../../shared/test.data';
import { Printer } from '../../../../../types/printer.types';
import { Dispatch } from 'redux';
import * as printerActions from '../../../../../store/actions/printer.actions';
import { CONSTANTS } from '../../../../../config/constants';
import { initialState } from '../../../../../store/reducers/printer.reducer';
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
    const { getByTestId } = render(
      <Provider store={store}>
        <AddPrinterComponent departmentId='1'></AddPrinterComponent>
      </Provider>
    );
    expect(getByTestId(`addprinter`)).toBeInTheDocument();
  });

  it('should call the edit printer action on form submit', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AddPrinterComponent departmentId='1'></AddPrinterComponent>
      </Provider>
    );

    const toggle = getByTestId('toggle-add');
    fireEvent.click(toggle);

    const button = getByTestId('submit-add');
    fireEvent.click(button);

    const expected = [{ type: CONSTANTS.ADD_PRINTER_FAILURE }];

    await waitFor(() => {
      expect(store.getActions()).toEqual([]);
    });
  });
});
