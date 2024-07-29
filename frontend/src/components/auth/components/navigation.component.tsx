import React, { Component } from 'react';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
  Stack,
  NavbarBrand,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '../../../types/app.types';
import { login } from '../../../store/actions/auth.action';

interface State {
  email: string;
  password: string;
}

class Navigation extends Component<NavigationProps, State> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = (event: any) => {
    switch (event.target.id) {
      case 'nav-email':
        this.setState({ email: event.target.value });
        break;
      case 'nav-password':
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  };

  onSubmit = (event: any) => {
    const { email, password } = this.state;
    event.preventDefault();
    this.props.login(email, password);
  };

  render() {
    const { email, password } = this.state;

    return (
      <Navbar bg='light' data-testid='navigation'>
        <Container>
          <Nav>
            <NavbarBrand as={Link} to={'/home'}>
              <img alt='logo' src='navlogodark.png' height={30}></img>
            </NavbarBrand>
          </Nav>
          <Form onSubmit={this.onSubmit}>
            <Stack direction='horizontal' gap={2}>
              <FormControl
                id='nav-email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={this.onChange}
              ></FormControl>
              <FormControl
                id='nav-password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={this.onChange}
              ></FormControl>
              <Button data-testid='submit' type='submit'>
                Login
              </Button>
              <Nav.Link as={Link} to='/register'>
                Register
              </Nav.Link>
            </Stack>
          </Form>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {
  login,
};
const connector = connect(mapStateToProps, mapDispatchToProps);

type NavigationProps = ConnectedProps<typeof connector>;

export default connector(Navigation);
