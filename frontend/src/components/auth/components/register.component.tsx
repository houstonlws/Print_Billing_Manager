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
  FormGroup,
  Row,
} from 'react-bootstrap';
import { register as registerUser } from '../../../store/actions';
import { AppState, TypeMap } from '../../../types';
import { Formik } from 'formik';
import * as yup from 'yup';

type FormData = {
  email: string;
  password: string;
  password2: string;
};

const initialValues = {
  email: '',
  password: '',
  password2: '',
};

const formSchema: yup.ObjectSchema<FormData> = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Must enter valid email'
    )
    .required('Email is required'),
  password: yup.string().required('Password is required'),
  password2: yup.string().required('Must confirm password'),
});

interface RegisterState {
  message: string;
  success: boolean;
}

class Register extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      message: '',
      success: false,
    };
  }

  onSubmit = async (formData: FormData) => {
    const result = await this.props.registerUser(
      formData.email,
      formData.password
    );
    if (result) {
      this.setState({ message: 'Registration success', success: true });
    } else {
      this.setState({
        message: 'Email taken',
        success: false,
      });
    }
  };

  validate = (values: FormData) => {
    let errors: TypeMap<string> = {};
    if (values.password !== values.password2) {
      errors.password2 = 'Passwords must match';
    }
    return errors;
  };

  render() {
    const { message, success } = this.state;
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
            {message !== '' && (
              <Alert
                className='text-center'
                variant={success ? 'success' : 'danger'}
              >
                {message}
              </Alert>
            )}
            <CardBody>
              <Formik
                validationSchema={formSchema}
                initialValues={initialValues}
                onSubmit={this.onSubmit}
                validate={this.validate}
              >
                {({ handleSubmit, values, errors, touched, handleChange }) => (
                  <Form noValidate onSubmit={handleSubmit}>
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

                    <FormGroup>
                      <FloatingLabel label='Password' className='mb-3'>
                        <FormControl
                          id='password'
                          type='password'
                          required
                          placeholder='Password'
                          value={values.password}
                          isInvalid={touched.password && !!errors.password}
                          onChange={handleChange}
                        ></FormControl>
                        <FormControl.Feedback type='invalid'>
                          {errors.password}
                        </FormControl.Feedback>
                      </FloatingLabel>
                    </FormGroup>
                    <FloatingLabel label='Confirm Password' className='mb-3'>
                      <FormControl
                        id='password2'
                        type='password'
                        placeholder='Confirm password'
                        isInvalid={touched.password2 && !!errors.password2}
                        value={values.password2}
                        onChange={handleChange}
                      ></FormControl>
                      <FormControl.Feedback type='invalid'>
                        {errors.password2}
                      </FormControl.Feedback>
                    </FloatingLabel>
                    <Button
                      data-testid='submit'
                      type='submit'
                      className='btn btn-primary'
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state: AppState, props: any) => ({});

const mapDispatchToProps = {
  registerUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type RegisterProps = ConnectedProps<typeof connector>;

export default connector(Register);
