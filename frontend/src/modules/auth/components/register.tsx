import React, { Component } from "react";
import { register } from "../utilities/auth.action";
import { ConnectedProps, connect } from "react-redux";

interface RegisterState {
  email: string,
  password: string,
  password2: string
}

class Register extends Component<RegisterProps, RegisterState> {

  constructor(props:RegisterProps){
    super(props)
    this.state = {
      email: '',
      password: '',
      password2: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

    handleChange(event: React.ChangeEvent<HTMLInputElement>){
        switch(event.target.id){
            case 'email': this.setState({email: event.target.value}); break
            case 'password': this.setState({password: event.target.value}); break
            case 'password2': this.setState({password2: event.target.value}); break
            default: return
        }
    }

    registerAccount = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!this.passwordsMatch()){
        console.log('passwords dont match')
        return
      }
      this.props.register(this.state.email, this.state.password)
    }

    passwordsMatch = () => {
        return this.state.password === this.state.password2 && 
        this.state.password !== '' && 
        this.state.password !== undefined
    }

  render() {

    return (
      <>
        <div className="w-100 h-100 d-flex justify-content-center  align-items-stretch">
          <div className="w-100 p-4 d-flex justify-content-center pb-4 flex-column ">
            <form onSubmit={this.registerAccount}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                ></input>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  placeholder="Confirm password"
                  value={this.state.password2}
                  onChange={this.handleChange}
                ></input>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  register
}

const connector = connect(()=>{return{}},mapDispatchToProps)

type RegisterProps = ConnectedProps<typeof connector>

export default connector(Register);
