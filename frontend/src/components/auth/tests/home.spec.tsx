import { Dispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as authActions from '../../../store/actions/auth.action';
import { initialState } from '../../../store/reducers/auth.reducer';
import HomeComponent from '../components/home.component';

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
          <HomeComponent></HomeComponent>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('home-root')).toBeInTheDocument();
  });
});
