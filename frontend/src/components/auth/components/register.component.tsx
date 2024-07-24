import React, { Component } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import {
  Alert,
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
import { register } from '../../../store/actions/auth.action';

interface RegisterState {
  email: string;
  password: string;
  password2: string;
  status: string | null;
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password2: '',
      status: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.id) {
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'password':
        this.setState({ password: event.target.value });
        break;
      case 'password2':
        this.setState({ password2: event.target.value });
        break;
      default:
    }
  }

  registerAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, password2 } = this.state;
    console.log('Form submitted', { email, password, password2 });
    if (this.passwordsMatch()) {
      this.props.register(email, password);
    } else this.setState({ status: 'danger' });
  };

  passwordsMatch = () => {
    return (
      this.state.password === this.state.password2 &&
      this.state.password !== '' &&
      this.state.password !== undefined
    );
  };

  render() {
    const { status } = this.state;

    return (
      <Container className='h-100'>
        <Row className='h-100'>
          <Card
            style={{
              maxWidth: '500px',
              margin: 'auto',
              padding: '0px',
            }}
          >
            <CardHeader>
              <h3>Register</h3>
            </CardHeader>
            <CardBody>
              {status === 'danger' && (
                <Alert variant={'danger'}>Passwords do not match.</Alert>
              )}
              <Form onSubmit={this.registerAccount}>
                <FloatingLabel label='Email Address' className='mb-3'>
                  <FormControl
                    type='email'
                    className='form-control'
                    id='email'
                    aria-describedby='emailHelp'
                    placeholder='Enter email'
                    value={this.state.email}
                    onChange={this.handleChange}
                  ></FormControl>
                </FloatingLabel>
                <FloatingLabel label='Password' className='mb-3'>
                  <FormControl
                    type='password'
                    className='form-control'
                    id='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleChange}
                  ></FormControl>
                </FloatingLabel>
                <FloatingLabel label='Confirm Password' className='mb-3'>
                  <FormControl
                    type='password'
                    className='form-control'
                    id='password2'
                    placeholder='Confirm password'
                    value={this.state.password2}
                    onChange={this.handleChange}
                  ></FormControl>
                </FloatingLabel>
                <Button type='submit' className='btn btn-primary'>
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  register,
};

const connector = connect(() => {
  return {};
}, mapDispatchToProps);

type RegisterProps = ConnectedProps<typeof connector>;

export default connector(Register);
