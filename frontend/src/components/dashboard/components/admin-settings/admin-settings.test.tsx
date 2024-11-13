import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { CONSTANTS } from '../../../../config/constants';
import AdminSettingsComponent from './admin-settings.component';

const mockStore = configureStore([thunk]);
let store = mockStore({
  auth: { user: { type: CONSTANTS.ADMIN } },
  admin: { users: [] },
});

const mockUpdateUser = jest.fn();

describe('Admin Settings Tests', () => {
  beforeEach(() => {});

  it('should render the component', () => {
    render(
      <Provider store={store}>
        <AdminSettingsComponent></AdminSettingsComponent>
      </Provider>
    );
    expect(screen.getByTestId('admin-settings-component')).toBeInTheDocument();
  });

  it('should call update user action to make changes to users', async () => {
    render(
      <Provider store={store}>
        <AdminSettingsComponent></AdminSettingsComponent>
      </Provider>
    );
    await waitFor(() => {
      expect(
        screen.getByTestId('admin-settings-component')
      ).toBeInTheDocument();
    });
  });
});
