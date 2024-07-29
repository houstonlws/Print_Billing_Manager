import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialState } from '../../../store/reducers/auth.reducer';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import { CONSTANTS } from '../../../config/constants';
import * as authActions from '../../../store/actions/auth.action';
import HomeComponent from '../components/home.component';

const store = configureStore([thunk])({ auth: initialState });
const mockLogin = jest.fn(
  (email: string, pwd: string) => async (dispatch: Dispatch) => {
    return Promise.resolve();
  }
);
jest.spyOn(authActions, 'login').mockImplementation(mockLogin);

describe('Login Component', () => {
  beforeEach(() => {});

  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomeComponent></HomeComponent>
        </MemoryRouter>
      </Provider>
    );
    expect(getByTestId('home-root')).toBeInTheDocument();
  });
});
