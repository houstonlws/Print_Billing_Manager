import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';
import * as authActions from '../../../../store/actions/auth.action';
import ProfileComponent from './profile.component';
import { CONSTANTS } from '../../../../config/constants';
import { User } from '../../../../types/auth.types';

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

let store = mockStore({ auth: { user: initialUser } });

const mockUpdateUserData = jest.fn(
  (data: User) => async (dispatch: Dispatch) => {
    return Promise.resolve(true);
  }
);
jest
  .spyOn(authActions, 'updateUserData')
  .mockImplementation(mockUpdateUserData);

describe('Profile Component', () => {
  beforeEach(() => {
    store = mockStore({ auth: { user: initialUser } });
    store.clearActions();
  });

  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileComponent></ProfileComponent>
        </MemoryRouter>
      </Provider>
    );
    expect(getByTestId('profile-component')).toBeInTheDocument();
  });

  it(' should update fields on text input', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <ProfileComponent></ProfileComponent>
      </Provider>
    );

    const firstName = getByPlaceholderText(/First Name/i);
    const lastName = getByPlaceholderText(/Last Name/i);
    const email = getByPlaceholderText(/Email Address/i);
    const phone = getByPlaceholderText(/Phone/i);
    const department_id = getByTestId(/department/i);

    const expectedfirstName = 'Tim';
    const expectedlastName = 'Hall';
    const expectedemail = 'test@email.com';
    const expectedphone = '777-777-7777';
    const expecteddepartment_id = '2';

    fireEvent.change(firstName, { target: { value: expectedfirstName } });
    fireEvent.change(lastName, { target: { value: expectedlastName } });
    fireEvent.change(email, { target: { value: expectedemail } });
    fireEvent.change(phone, { target: { value: expectedphone } });
    fireEvent.change(department_id, {
      target: { value: expecteddepartment_id },
    });

    expect(firstName).toHaveValue(expectedfirstName);
    expect(lastName).toHaveValue(expectedlastName);
    expect(email).toHaveValue(expectedemail);
    expect(phone).toHaveValue(expectedphone);
    expect(department_id).toHaveValue(expecteddepartment_id);
  });

  it('should call the update user action on form submit', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileComponent></ProfileComponent>
        </MemoryRouter>
      </Provider>
    );
    const button = getByTestId('update-user-submit');
    fireEvent.submit(button);

    const expected: any[] = [];

    await waitFor(() => {
      expect(store.getActions()).toEqual(expected);
    });
  });
});
