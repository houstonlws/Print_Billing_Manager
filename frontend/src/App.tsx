import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import {Login, Dashboard, Account, Home, Register} from './views';
import { authInitializeAsync } from './store/actions/auth.action';
import Navigation from './components/navigation';
import { ConnectedProps, connect } from 'react-redux';

class App extends React.Component<AppProps> {

  componentDidMount() {
    this.props.authInitializeAsync()
  }

  render() {
    return (
      <> 
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="settings" element={<Account/>}></Route>
          </Route>
        </Routes>
      </>
    )
  }
  
}

const mapDispatchToProps = {
  authInitializeAsync
}

const connector = connect(()=>{return{}}, mapDispatchToProps)
type AppProps = ConnectedProps<typeof connector>

export default connector(App);
