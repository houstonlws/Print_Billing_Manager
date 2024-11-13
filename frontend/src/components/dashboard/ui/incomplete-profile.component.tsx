import { Formik } from 'formik';
import React, { useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
} from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import * as yup from 'yup';
import { departmentsList } from '../../../config/app-data';
import { CONSTANTS } from '../../../config/constants';
import { getUserData, updateUserData } from '../../../store/actions';
import { AppState } from '../../../types';

type FormData = {
  firstName: string;
  lastName: string;
  department: string;
};

const mapStateToProps = (state: AppState) => ({
  user: state.account.user,
});
const mapDispatchToProps = {
  updateUserData,
  getUserData,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const IncompleteProfile = (props: ReduxProps) => {
  useEffect(() => {
    const onMount = async () => {
      await props.getUserData(props.user.id);
    };
    onMount();
  }, [props]);

  const schema = yup.object().shape({
    firstName: yup.string().required('Must provide first name'),
    lastName: yup.string().required('Must provide last name'),
    department: yup.string().required('Must provide department id'),
  });

  const onSubmit = async (formData: FormData) => {
    const { type } = props.user;
    const user = {
      ...props.user,
      firstName: formData?.firstName || '',
      lastName: formData?.lastName || '',
      department_id:
        type === CONSTANTS.ADMIN ? '0' : formData?.department || '',
    };
    const succeeded = await props.updateUserData(user);
    if (succeeded) window.location.reload();
  };

  const { user } = props;

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '100vw',
        background: '#00000075',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card>
        <CardHeader className='text-center'>
          <h2>Profile Incomplete</h2>
        </CardHeader>
        <CardBody className='text-center'>
          Please complete your profile by completing the following form.
        </CardBody>
        <CardBody>
          <Formik
            initialValues={{
              firstName: props.user.firstName || '',
              lastName: props.user.lastName || '',
              department: props.user.department_id || '',
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FloatingLabel label='First Name' className='mb-3'>
                    <FormControl
                      id='firstName'
                      type='text'
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={touched.firstName && !!errors.firstName}
                    ></FormControl>
                    <FormControl.Feedback type='invalid'>
                      {errors.firstName}
                    </FormControl.Feedback>
                  </FloatingLabel>
                  <FloatingLabel label='Last Name' className='mb-3'>
                    <FormControl
                      id='lastName'
                      type='text'
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={touched.lastName && !!errors.lastName}
                    ></FormControl>
                    <FormControl.Feedback type='invalid'>
                      {errors.lastName}
                    </FormControl.Feedback>
                  </FloatingLabel>
                  {user.type === CONSTANTS.USER && [
                    <FloatingLabel key='1' label='department' className='mb-3'>
                      <FormSelect
                        key={2}
                        id={'department'}
                        data-testid={'select-department'}
                        onChange={handleChange}
                        value={values.department}
                        isInvalid={touched.department && !!errors.department}
                      >
                        <option value={''}>--Select A Department</option>
                        {departmentsList.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </FormSelect>
                      <FormControl.Feedback type='invalid'>
                        {errors.department}
                      </FormControl.Feedback>
                    </FloatingLabel>,
                  ]}
                </FormGroup>
                <Button type='submit'>Update Profile</Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default connector(IncompleteProfile);
