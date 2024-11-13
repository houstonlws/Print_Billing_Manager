import { Dispatch } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CONSTANTS } from '../../../../config/constants';
import * as accountActions from '../../../../store/actions/account.actions';
import { User } from '../../../../types';
import ProfileComponent from './profile.component';

const mockStore = configureStore([thunk]);

const initialUser = {
  id: 1,
  email: 'test@email.com',
  type: CONSTANTS.USER,
  firstName: 'John',
  lastName: 'Adams',
  department_id: 1,
  phone: '555-555-5555',
};

let store = mockStore({ account: { user: initialUser } });

const mockUpdateUserData = jest.fn(
  (data: User) => async (dispatch: Dispatch) => {
    return Promise.resolve(true);
  }
);
jest
  .spyOn(accountActions, 'updateUserData')
  .mockImplementation(mockUpdateUserData);

describe('Profile Component', () => {
  beforeEach(() => {
    store = mockStore({ account: { user: initialUser } });
    store.clearActions();
  });

  it('should render the component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileComponent></ProfileComponent>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('profile-component')).toBeInTheDocument();
  });

  it('should call the update user action on form submit', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileComponent></ProfileComponent>
        </MemoryRouter>
      </Provider>
    );
    const button = screen.getByTestId('update-user-submit');
    fireEvent.submit(button);

    const expected: any[] = [];

    await waitFor(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
