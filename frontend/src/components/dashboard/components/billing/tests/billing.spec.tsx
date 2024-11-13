import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BillingComponent from '../billing.component';
import { testBillHistory } from './test.data';

const mockStore = configureStore([thunk]);

const initialState = {
  billing: { billData: testBillHistory },
  account: { user: { departmet_id: '1' } },
  admin: { activeProfile: {} },
  tracking: { totals: {} },
};

let store = mockStore(initialState);

describe('Billing Component Tests', () => {
  beforeEach(() => {
    store = mockStore(initialState);
    store.clearActions();
  });

  it('should render the component', () => {
    render(
      <Provider store={store}>
        <BillingComponent department='1'></BillingComponent>
      </Provider>
    );
    expect(screen.getByTestId('billing-component')).toBeInTheDocument();
  });
});
