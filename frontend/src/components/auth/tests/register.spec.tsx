import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Register from '../components/register.component';
import thunk from 'redux-thunk';
import { initialState } from '../../../store/reducers/auth.reducer';
import * as authActions from '../../../store/actions/auth.action';
import { Dispatch } from 'redux';
import { CONSTANTS } from '../../../config/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

const mockRegisterAction = jest.fn(
  (eml: string, pwd: string) => async (dispatch: Dispatch) => {
    return Promise.resolve();
  }
);

jest.spyOn(authActions, 'register').mockImplementation(mockRegisterAction);

describe('Register Component', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('should render the component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );
    expect(getByText(/register/i)).toBeInTheDocument();
  });

  test('should update state on input change', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    const emailInput = getByPlaceholderText(/enter email/i);
    const passwordInput = getByPlaceholderText(/^password$/i);
    const confirmPasswordInput = getByPlaceholderText(/Confirm Password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  test('should show error if passwords do not match', async () => {
    const { getAllByPlaceholderText, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    const passwordInput = getByPlaceholderText(/^password$/i);
    const confirmPasswordInput = getByPlaceholderText(/confirm password/i);
    const submitButton = getByText(/submit/i);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password321' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('should call register success action on form submit with matching passwords', async () => {
    const { getAllByPlaceholderText, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    const emailInput = getByPlaceholderText(/enter email/i);
    const passwordInput = getAllByPlaceholderText(/password/i)[0];
    const confirmPasswordInput = getByPlaceholderText(/confirm password/i);
    const submitButton = getByText(/submit/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    fireEvent.submit(submitButton);

    const expected = [{ type: CONSTANTS.REGISTER_SUCCESS }];

    await waitFor(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
