import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { getNotifications, logout, refreshToken } from "./store/actions/auth.action";
import { ConnectedProps, connect } from "react-redux";
import { AppState } from "./types/app.types";
import DashboardComponent from "./components/dashboard/dashboard.component";
import { getDepartments } from "./store/actions/data.action";
import authComponent from "./components/auth/auth.component";

class App extends React.Component<AppProps, AppState> {

  componentDidMount() {
    this.props.refreshToken();
    this.props.getNotifications();
  }

  render() {

    const { loggedIn } = this.props;

    return (
      <div className="h-100">
        <Routes>
          <Route
            path="/*"
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
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = {
  refreshToken,
  getDepartments,
  logout,
  getNotifications
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
