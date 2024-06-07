import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";
import { logout } from "../store/actions/auth.action";
import { AppState } from "../models/state.model";

class Navigation extends Component<NavigationProps> {    

  logout = () =>{
    this.props.logout()
  }

  render() {
  
    return (
      <Navbar bg="light">
        <Container>
          <Nav>
            <Nav.Link as={Link} to={this.props.loggedIn?"dashboard":"/"}>
              Home
            </Nav.Link>
          </Nav>
          {!this.props.loggedIn && (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
          {this.props.loggedIn && (
            <Nav>
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    );

  }
}

const mapStateToProps = (state: AppState) => {
  return {
    loggedIn: state.auth.loggedIn,
    user: state.user.user
  }
}

const mapDispatchToProps = {
  logout
}
const connector = connect(mapStateToProps, mapDispatchToProps)

type NavigationProps = ConnectedProps<typeof connector>

export default connector(Navigation);
