import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent, waitFor } from '@testing-library/dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Register from './register.component';
import thunk from 'redux-thunk';
import * as authActions from '../../../store/actions/auth.action';
import { Dispatch } from '@reduxjs/toolkit';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
type RegisterAction = (
  email: string,
  password: string
) => (dispatch: Dispatch) => Promise<any>;
const mockRegister: RegisterAction = jest.fn(() => () => Promise.resolve({}));
jest.spyOn(authActions, 'register').mockImplementation(mockRegister);

let store = mockStore({});

describe('Register Component', () => {
  beforeEach(() => {
    store = mockStore({});
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
    const { getAllByPlaceholderText, getByPlaceholderText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    const emailInput = getByPlaceholderText(/enter email/i);
    const passwordInput = getAllByPlaceholderText(/Password/i)[0];
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
    console.log = jest.fn();

    const { getAllByPlaceholderText, getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    const passwordInput = getAllByPlaceholderText(/password/i)[0];
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

  test('should call register action on form submit with matching passwords', async () => {
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

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        'test@example.com',
        'password123'
      );
    });
  });
});
