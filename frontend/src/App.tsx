import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import authComponent from './components/auth/auth.component';
import DashboardComponent from './components/dashboard/dashboard.component';
import { logout, refreshToken } from './store/actions/auth.action';
import { AppState } from './types/app.types';

class App extends React.Component<AppProps, AppState> {
  async componentDidMount() {
    this.props.refreshToken();
  }
  render() {
    const { loggedIn } = this.props.auth;

    return (
      <div className='h-100'>
        <Routes>
          <Route
            path='/*'
            Component={loggedIn ? DashboardComponent : authComponent}
          ></Route>
        </Routes>
        <div id='background'></div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = {
  logout,
  refreshToken,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
