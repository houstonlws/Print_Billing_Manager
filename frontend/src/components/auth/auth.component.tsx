import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import NavigationComponent from './components/navigation.component';
import homeComponent from './components/home.component';
import registerComponent from './components/register.component';
import loginComponent from './components/login.component';

export class AuthComponent extends Component {
  render() {
    return (
      <div className="h-100">
        <NavigationComponent></NavigationComponent>
        <Routes>
          <Route path="*" element={<Navigate to="/home" />}></Route>
          <Route path="/home" Component={homeComponent}></Route>
          <Route path="/register" Component={registerComponent}></Route>
          <Route path="/login" Component={loginComponent}></Route>
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
