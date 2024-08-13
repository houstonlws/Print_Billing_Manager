import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BillingComponent from '../billing.component';
import { testBillHistory } from './test.data';
import { CONSTANTS } from '../../../../../config/constants';
import * as billingActions from '../../../../../store/actions/billing.actions';
import { Dispatch } from 'redux';

const mockStore = configureStore([thunk]);
let store = mockStore({
  billing: { billData: testBillHistory },
  auth: { user: { departmet_id: '1' } },
  admin: {},
});

const mockGetBillHistory = jest.fn(
  (depId: string | number) => async (dispatch: Dispatch) => {
    return Promise.resolve();
  }
);
jest
  .spyOn(billingActions, 'getDepartmentBillingHistory')
  .mockImplementation(mockGetBillHistory);

describe('Billing Component Tests', () => {
  beforeEach(() => {
    store = mockStore({
      billing: { billData: testBillHistory },
      auth: { user: { departmet_id: '1' } },
    });
    store.clearActions();
  });

  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BillingComponent></BillingComponent>
      </Provider>
    );
    expect(getByTestId('billing-component')).toBeInTheDocument();
  });

  it('should show charges for previous months', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BillingComponent></BillingComponent>
      </Provider>
    );

    const now = new Date();
    const previousBills = testBillHistory.filter(
      (b) => new Date(b.billing_cycle_end) < now
    );

    previousBills.forEach((b) => {
      expect(getByTestId(`previous-${b.id}`)).toBeInTheDocument();
    });
  });

  it('should show charges for current month', () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-06-10'));

    const { getByTestId } = render(
      <Provider store={store}>
        <BillingComponent></BillingComponent>
      </Provider>
    );

    const expectedStart = '2024-06-01';
    const expectedEnd = '2024-06-30';

    expect(getByTestId(`current-start`).innerHTML).toEqual(expectedStart);
    expect(getByTestId(`current-end`).innerHTML).toEqual(expectedEnd);
  });
});
