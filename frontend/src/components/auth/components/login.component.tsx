import { connect, ConnectedProps } from 'react-redux';
import React, { ChangeEvent, Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppState } from '../../../types/app.types';
import { login } from '../../../store/actions/auth.action';

interface LoginState {
  email: string;
  password: string;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      default:
    }
  };

  handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  render() {
    return (
      <Container className="align-items-center h-100">
        <Row className="h-100">
          <Card
            style={{
              maxWidth: '500px',
              margin: 'auto',
            }}
          >
            <CardHeader>
              <h2>Login</h2>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleLogin}>
                <FloatingLabel label="Email Address" className="mb-3">
                  <FormControl
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.onChange}
                  ></FormControl>
                </FloatingLabel>
                <FloatingLabel label="Password" className="mb-3">
                  <FormControl
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                  ></FormControl>
                </FloatingLabel>
                <Button type="submit">Submit</Button>
              </Form>
            </CardBody>
          </Card>
          <div className="text-center">
            <p>No account?</p>
            <Link to="/register">Register</Link>
          </div>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = {
  login,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type LoginProps = ConnectedProps<typeof connector>;

export default connector(Login);
