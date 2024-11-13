import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  FloatingLabel,
  Form,
  FormControl,
} from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import * as yup from 'yup';
import { getAllUsers, register } from '../../../../../store/actions';
import { AppState, User } from '../../../../../types';

const mapStateToProps = (state: AppState) => ({
  admin: state.admin,
});
const mapDispatchToProps = {
  register,
  getAllUsers,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const AddUser = (props: ReduxProps) => {
  const [added, setAdded] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const createUser = async (formData: User) => {
    const result = await props.register(formData.email, formData.password!);
    if (result) {
      setAdded(true);
      window.location.reload();
    } else setFailed(true);
  };

  return (
    <Card>
      <CardBody>
        {failed && <Alert variant='danger'>Problem adding user</Alert>}
        <Formik
          initialValues={{
            id: '',
            email: '',
            type: '',
            department_id: '',
            password: '',
          }}
          onSubmit={createUser}
          validationSchema={schema}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit}>
              <div className='d-flex'>
                <h3 className='me-auto'>Add User</h3>
                <Button type='submit'>Submit</Button>
              </div>
              <FloatingLabel label='Email' className='mb-3'>
                <FormControl
                  id='email'
                  type='email'
                  placeholder='Email'
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                ></FormControl>
                <FormControl.Feedback type='invalid'>
                  {errors.email}
                </FormControl.Feedback>
              </FloatingLabel>
              <FloatingLabel label='Temp Password' className='mb-3'>
                <FormControl
                  id='password'
                  type='text'
                  placeholder='Temp Password'
                  value={values.password || ''}
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                ></FormControl>
                <FormControl.Feedback type='invalid'>
                  {errors.password}
                </FormControl.Feedback>
              </FloatingLabel>
            </Form>
          )}
        </Formik>
        {added && <Alert>User Created</Alert>}
      </CardBody>
    </Card>
  );
};

export default connector(AddUser);
