import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BillingComponent from '../billing.component';
import { testBillHistory } from './test.data';

const mockStore = configureStore([thunk]);
let store = mockStore({
  billing: { billData: testBillHistory },
  auth: { user: { departmet_id: '1' } },
  admin: {},
});

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
});
