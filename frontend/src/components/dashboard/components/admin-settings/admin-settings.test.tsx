import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import AdminSettingsComponent from './admin-settings.component';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CONSTANTS } from '../../../../config/constants';

const mockStore = configureStore([thunk]);
let store = mockStore({
  auth: { user: { type: CONSTANTS.ADMIN } },
  admin: { users: [] },
});

const mockUpdateUser = jest.fn();

describe('Admin Settings Tests', () => {
  beforeEach(() => {});

  it('should render the component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AdminSettingsComponent></AdminSettingsComponent>
      </Provider>
    );
    expect(getByTestId('admin-settings-component')).toBeInTheDocument();
  });

  it('should call update user action to make changes to users', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AdminSettingsComponent></AdminSettingsComponent>
      </Provider>
    );
    await waitFor(() => {
      expect(getByTestId('admin-settings-component')).toBeInTheDocument();
    });
  });
});
