import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Dispatch } from 'redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CONSTANTS } from '../../../../../config/constants';
import * as printerActions from '../../../../../store/actions/printer.actions';
import { initialState } from '../../../../../store/reducers/printer.reducer';
import { Printer } from '../../../../../types';
import { printers } from '../../../shared/test.data';
import EditPrinterComponent from '../components/edit-printer.component';

const mockStore = configureStore([thunk]);
let store = mockStore({ printer: initialState });
const printer = printers[0] as unknown as Printer;
const mockUpdatePrinter = jest.fn(
  (printer: Printer) => async (dispatch: Dispatch) => {
    return Promise.resolve();
  }
);
jest
  .spyOn(printerActions, 'updatePrinter')
  .mockImplementation(mockUpdatePrinter);

describe('Edit printer tests', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should render the component', () => {
    render(
      <Provider store={store}>
        <EditPrinterComponent printer={printer}></EditPrinterComponent>
      </Provider>
    );
    expect(
      screen.getByTestId(`edit-printer-${printer.id}`)
    ).toBeInTheDocument();
  });

  it('should call the edit printer action on form submit', async () => {
    render(
      <Provider store={store}>
        <EditPrinterComponent printer={printer}></EditPrinterComponent>
      </Provider>
    );

    const toggle = screen.getByTestId('show-editor');
    fireEvent.click(toggle);

    const button = screen.getByTestId('submit-edit');
    fireEvent.click(button);

    const expected = [{ type: CONSTANTS.UPDATE_PRINTER_FAILURE }];

    await waitFor(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
