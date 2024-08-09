import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { printers } from '../../../shared/test.data';
import EditPrinterComponent from '../components/edit-printer.component';
import { Printer } from '../../../../../types/printer.types';
import { Dispatch } from 'redux';
import * as printerActions from '../../../../../store/actions/printer.actions';
import { CONSTANTS } from '../../../../../config/constants';
import { initialState } from '../../../../../store/reducers/printer.reducer';

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
    const { getByTestId } = render(
      <Provider store={store}>
        <EditPrinterComponent printer={printer}></EditPrinterComponent>
      </Provider>
    );
    expect(getByTestId(`edit-printer-${printer.id}`)).toBeInTheDocument();
  });

  it(' should update fields on text input', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <EditPrinterComponent printer={printer}></EditPrinterComponent>
      </Provider>
    );

    const button = getByTestId('show-editor');
    fireEvent.click(button);

    const serial = getByPlaceholderText(/Serial/i);
    const model = getByPlaceholderText(/model/i);
    const brand = getByPlaceholderText(/brand/i);
    const location = getByPlaceholderText(/location/i);
    const ip = getByPlaceholderText(/IP Address/i);
    const mac = getByPlaceholderText(/MAC Address/i);
    const firmware = getByPlaceholderText(/Firmware Version/i);
    const install_date = getByPlaceholderText(/Installation Date/i);
    const warranty = getByPlaceholderText(/Warranty Expiration/i);

    const expectedserial = 'XYZ1223';
    const expectedmodel = 'EPSON';
    const expectedbrand = 'MFC-458W';
    const expectedlocation = 'Building 1 Office 2';
    const expectedip = '192.168.0.1';
    const expectedmac = '10:20:123:10';
    const expectedfirmware = '1.0.0';
    const expectedinstall_date = '2016/06/01';
    const expectedwarranty = '2018/06/01';

    fireEvent.change(serial, { target: { value: expectedserial } });
    fireEvent.change(model, { target: { value: expectedmodel } });
    fireEvent.change(brand, { target: { value: expectedbrand } });
    fireEvent.change(location, { target: { value: expectedlocation } });
    fireEvent.change(ip, { target: { value: expectedip } });
    fireEvent.change(mac, { target: { value: expectedmac } });
    fireEvent.change(firmware, { target: { value: expectedfirmware } });
    fireEvent.change(install_date, { target: { value: expectedinstall_date } });
    fireEvent.change(warranty, { target: { value: expectedwarranty } });

    expect(serial).toHaveValue(expectedserial);
    expect(model).toHaveValue(expectedmodel);
    expect(brand).toHaveValue(expectedbrand);
    expect(location).toHaveValue(expectedlocation);
    expect(ip).toHaveValue(expectedip);
    expect(mac).toHaveValue(expectedmac);
    expect(firmware).toHaveValue(expectedfirmware);
    expect(install_date).toHaveValue(expectedinstall_date);
    expect(warranty).toHaveValue(expectedwarranty);
  });

  it('should call the edit printer action on form submit', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <EditPrinterComponent printer={printer}></EditPrinterComponent>
      </Provider>
    );

    const toggle = getByTestId('show-editor');
    fireEvent.click(toggle);

    const button = getByTestId('submit-edit');
    fireEvent.click(button);

    const expected = [{ type: CONSTANTS.UPDATE_PRINTER_FAILURE }]; //Because update printer is a protected endpoint

    await waitFor(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
