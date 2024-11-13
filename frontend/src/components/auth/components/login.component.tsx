import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { Formik } from 'formik';
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
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { login } from '../../../store/actions';
import { AppState } from '../../../types';

type FormData = {
  email: string;
  password: string;
};

const initialValues: FormData = {
  email: '',
  password: '',
};

const schema: yup.ObjectSchema<FormData> = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

interface LoginState {
  message: string;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onSubmit = async (formData: FormData) => {
    const result = await this.props.login(formData.email, formData.password);
    if (!result) this.setState({ message: 'Invalid email or password' });
  };

  render() {
    const { message } = this.state;
    return (
      <Container data-testid='login-root' className='align-items-center h-100'>
        <Row className='h-100'>
          <Card
            style={{
              maxWidth: '500px',
              margin: 'auto',
            }}
          >
            <CardHeader>
              <h2>Login</h2>
            </CardHeader>
            {message !== '' && <Alert variant='danger'>{message}</Alert>}
            <CardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={this.onSubmit}
              >
                {({ handleSubmit, handleChange, values, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                    <FloatingLabel label='Email Address' className='mb-3'>
                      <FormControl
                        id='email'
                        type='email'
                        placeholder='Enter email'
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                      ></FormControl>
                      <FormControl.Feedback type='invalid'>
                        {errors.email}
                      </FormControl.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label='Password' className='mb-3'>
                      <FormControl
                        id='password'
                        type='password'
                        placeholder='Password'
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      ></FormControl>
                      <FormControl.Feedback type='invalid'>
                        {errors.password}
                      </FormControl.Feedback>
                    </FloatingLabel>
                    <Button data-testid='submit' type='submit'>
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
          <div className='text-center'>
            <p>No account?</p>
            <Link to='/register'>Register</Link>
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
