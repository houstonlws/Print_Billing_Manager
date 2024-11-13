import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
  Row,
} from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import * as yup from 'yup';
import { departmentsList } from '../../../../config/app-data';
import { CONSTANTS } from '../../../../config/constants';
import { updateUserData } from '../../../../store/actions';
import { AppState, User } from '../../../../types';

const mapStateToProps = (state: AppState) => {
  return {
    user: state.account.user,
  };
};
const mapDispatchToProps = {
  updateUserData,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ProfileProps = ConnectedProps<typeof connector>;

const ProfileComponent = (props: ProfileProps) => {
  const [status, setStatus] = useState<string | null>(null);
  const { type } = props.user;
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    department_id: yup.string().required('Department is required'),
    email: yup.string().required('Email is required'),
    phone: yup.string(),
  });

  const handleFormSubmit = async (formData: User) => {
    const result = await props.updateUserData(formData);
    if (result) {
      setStatus('success');
    } else {
      setStatus('danger');
    }
  };

  return (
    <div data-testid='profile-component'>
      <Card className='mb-3'>
        <CardHeader>
          <h2>User Profile</h2>
        </CardHeader>
      </Card>
      {status !== null && (
        <Alert variant={status}>
          {status === 'danger'
            ? 'Error updating profile'
            : 'Updated Profile Successfully'}
        </Alert>
      )}

      <Card>
        <CardBody>
          <Formik
            initialValues={{
              id: props.user?.id,
              firstName: props.user?.firstName || '',
              lastName: props.user?.lastName || '',
              department_id: props.user?.department_id || '',
              email: props.user?.email || '',
              phone: props.user?.phone || '',
              type: '',
            }}
            onSubmit={handleFormSubmit}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, errors, values, touched }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    First Name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type='text'
                      id='firstName'
                      placeholder={'First Name'}
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={touched.firstName && !!errors.firstName}
                    ></Form.Control>
                    <FormControl.Feedback type='invalid'>
                      {errors.firstName}
                    </FormControl.Feedback>
                  </Col>
                  <Form.Label column sm={2}>
                    Last Name:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type='text'
                      id='lastName'
                      placeholder='Last Name'
                      onChange={handleChange}
                      value={values.lastName}
                      isInvalid={touched.lastName && !!errors.lastName}
                    ></Form.Control>
                    <FormControl.Feedback type='invalid'>
                      {errors.lastName}
                    </FormControl.Feedback>
                  </Col>
                </Form.Group>
                <FormGroup as={Row}>
                  <Form.Label column sm={2}>
                    Email:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type='email'
                      id='email'
                      placeholder='Email Address'
                      onChange={handleChange}
                      value={values.email}
                      isInvalid={touched.email && !!errors.email}
                    ></Form.Control>
                    <FormControl.Feedback type='invalid'>
                      {errors.email}
                    </FormControl.Feedback>
                  </Col>
                </FormGroup>
                <FormGroup as={Row}>
                  <Form.Label column sm={2}>
                    Phone:
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type='phone'
                      id='phone'
                      placeholder='Phone'
                      onChange={handleChange}
                      value={values.phone}
                      isInvalid={touched.phone && !!errors.phone}
                    ></Form.Control>
                    <FormControl.Feedback type='invalid'>
                      {errors.phone}
                    </FormControl.Feedback>
                  </Col>
                </FormGroup>
                {type === CONSTANTS.USER && [
                  <Form.Group as={Row}>
                    <Form.Label key={1} column sm={2}>
                      Department:
                    </Form.Label>
                    <Col sm={10}>
                      <FormSelect
                        key={2}
                        className='form-control'
                        id='department'
                        data-testid='department'
                        onChange={handleChange}
                        value={values.department_id}
                        isInvalid={
                          touched.department_id && !!errors.department_id
                        }
                      >
                        <option value=''>--Select a Department</option>
                        {departmentsList?.map((department) => (
                          <option value={department.id} key={department.id}>
                            {department.name}
                          </option>
                        ))}
                      </FormSelect>
                      <FormControl.Feedback type='invalid'>
                        {errors.department_id}
                      </FormControl.Feedback>
                    </Col>
                  </Form.Group>,
                ]}
                <Button data-testid='update-user-submit' type='submit'>
                  Update
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default connector(ProfileComponent);
