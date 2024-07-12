import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import NavigationComponent from "../app/navigation.component";
import homeComponent from "../app/home.component";
import registerComponent from "./register.component";
import loginComponent from "./login.component";

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
