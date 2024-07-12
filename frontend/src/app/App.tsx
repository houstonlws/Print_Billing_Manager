import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";
import { logout, refreshToken } from "./store/actions/auth.action";
import { AppState } from "./types/app.types";
import DashboardComponent from "./components/dashboard/dashboard.component";
import { getDepartments } from "./store/actions/data.action";
import authComponent from "./components/auth/auth.component";

class App extends React.Component<AppProps, AppState> {
  componentDidMount() {
    this.props.refreshToken();
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
        <div id="background"></div>
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
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AppProps = ConnectedProps<typeof connector>;

export default connector(App);
