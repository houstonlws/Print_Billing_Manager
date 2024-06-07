import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { AuthModule, DashboardModule } from './modules';
import { refreshToken } from './modules/auth/utilities/auth.action';
import { ConnectedProps, connect } from 'react-redux';
import { AuthState } from './modules/auth/utilities/auth.models';
import { DashboardState } from './modules/dashboard/utilities/dashboard.models';

export interface AppState {
  auth: AuthState,
  dashboard: DashboardState
}

class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps){
    super(props)
  }

  componentDidMount() {
    this.props.refreshToken()
  }

  
  render() {

    const { loggedIn } = this.props

    return (
      <> 
        <Routes>
          <Route path="/*" Component={ loggedIn ? DashboardModule : AuthModule}></Route>
        </Routes>
      </>
    )
  }
  
}

const mapStateToProps = (state:AppState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = {
  refreshToken
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type AppProps = ConnectedProps<typeof connector>

export default connector(App);
