import { connect } from "react-redux";
import React, { Component } from "react";
import { login } from "../store/actions/auth.action";
import { getUserData } from "../store/actions/user.action";
import { ConnectedProps } from "react-redux";
import { AppState } from "../models/state.model";

class Login extends Component<LoginProps>{

  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({password: event.target.value})
  }

  onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({username: event.target.value})
  }

  handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.login(this.props.username, this.props.password).then(res => {
      window.location.assign('/dashboard')
    })
  }

  render(){
      
    return (
      <>
        <div className="w-100 h-100 d-flex justify-content-center  align-items-stretch">
          <div className="w-50 p-4 d-flex justify-content-center pb-4 text-bg-primary"></div>
          <div className="w-50 p-4 d-flex justify-content-center pb-4 flex-column ">
            <h2>Login</h2>
            <form onSubmit={this.handleLogin}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.props.username}
                  onChange={this.onUsernameChange}
                ></input>
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={this.props.password}
                  onChange={this.onPasswordChange}
                ></input>
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                ></input>
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }

}

const mapStateToProps = (state:AppState) => {
  return {
    loggedIn: state.auth.loggedIn,
    username: "",
    password: "",
    loading: false,
    user: null
  }
}

const mapDispatchToProps = {
  login,
  getUserData
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type LoginProps = ConnectedProps<typeof connector>

export default connector(Login);
