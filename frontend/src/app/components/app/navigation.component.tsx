import React, { Component } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";
import { AppState } from "../../types/app.types";
import { logout } from "../../store/actions/auth.action";

class Navigation extends Component<NavigationProps> {    

  render() {

    const { loggedIn, logout } = this.props
  
    return (
      <Navbar bg="light">
        <Container>
          <Nav>
            {!loggedIn && (
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            )}
            {loggedIn && (
              <>
                <Nav.Link as={Link} to={"/"}>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to={"/printers"}>
                  Printers
                </Nav.Link>
                <Nav.Link as={Link} to={"/tracking"}>
                  Tracking
                </Nav.Link>
                <Nav.Link as={Link} to={"/billing"}>
                  Billing
                </Nav.Link>
              </>
            )}
          </Nav>
          {!loggedIn && (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
          {loggedIn && (
            <Nav>
              <Nav.Link as={Link} to={"/profile"}>
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to={"/notifications"}>
                  Notifications
                </Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    );

  }
}

const mapStateToProps = (state: AppState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

const mapDispatchToProps = {
  logout
}
const connector = connect(mapStateToProps, mapDispatchToProps)

type NavigationProps = ConnectedProps<typeof connector>

export default connector(Navigation);
