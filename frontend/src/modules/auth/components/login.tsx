import { connect } from "react-redux";
import React, { ChangeEvent, Component } from "react";
import { login } from '../utilities/auth.action'
import { ConnectedProps } from "react-redux";
import { AppState } from "../../../App";

interface LoginState {
  email: string,
  password: string,
}

class Login extends Component<LoginProps, LoginState>{

  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch(event.target.id) {
      case 'email': this.setState({email: event.target.value}); break
      case 'password': this.setState({password: event.target.value}); break
      default: return
    }
  }

  handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    this.props.login(this.state.email, this.state.password)
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                ></input>
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
  }
}

const mapDispatchToProps = {
  login
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type LoginProps = ConnectedProps<typeof connector>

export default connector(Login);
