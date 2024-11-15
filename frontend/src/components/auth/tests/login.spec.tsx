import { Dispatch } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CONSTANTS } from '../../../config/constants';
import * as authActions from '../../../store/actions/auth.action';
import { initialState } from '../../../store/reducers/auth.reducer';
import LoginComponent from '../components/login.component';

const store = configureStore([thunk])({ auth: initialState });
const mockLogin = jest.fn(
  (email: string, pwd: string) => async (dispatch: Dispatch) => {
    return Promise.resolve(false);
  }
);
jest.spyOn(authActions, 'login').mockImplementation(mockLogin);

describe('Login Component', () => {
  beforeEach(() => {});

  it('should render the component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginComponent></LoginComponent>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('login-root')).toBeInTheDocument();
  });

  it('should update state on text input', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginComponent></LoginComponent>
        </MemoryRouter>
      </Provider>
    );

    const eml = screen.getByPlaceholderText(/email/i);
    const pwd = screen.getByPlaceholderText(/password/i);

    const expectedEml = 'test@email.com';
    const expectedPwd = 'pass';

    fireEvent.change(eml, { target: { value: expectedEml } });
    fireEvent.change(pwd, { target: { value: expectedPwd } });

    expect(eml).toHaveValue(expectedEml);
    expect(pwd).toHaveValue(expectedPwd);
  });

  it('should dispatch the login action on submit', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginComponent></LoginComponent>
        </MemoryRouter>
      </Provider>
    );

    const eml = screen.getByPlaceholderText(/email/i);
    const pwd = screen.getByPlaceholderText(/password/i);
    const button = screen.getByTestId('submit');

    const expectedEml = 'test@email.com';
    const expectedPwd = 'pass';

    fireEvent.change(eml, { target: { value: expectedEml } });
    fireEvent.change(pwd, { target: { value: expectedPwd } });

    fireEvent.submit(button);

    const expectedActions = [{ type: CONSTANTS.LOGIN_FAIL }];

    await waitFor(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
