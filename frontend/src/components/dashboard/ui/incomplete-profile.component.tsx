import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../types/app.types';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from 'react-bootstrap';
import { departmentsList } from '../../../config/app-data';
import { updateUserData } from '../../../store/actions';
import { CONSTANTS } from '../../../config/constants';

interface State {
  form: {
    firstName: string;
    lastName: string;
    department: string;
  };
  failed: boolean;
}

class IncompleteProfile extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      form: {
        firstName: props.user.firstName || '',
        lastName: props.user.lastName || '',
        department: props.user.department_id || '',
      },
      failed: false,
    };
  }
  onChange = (event: any) => {
    let { form } = this.state;
    switch (event.target.id) {
      case 'firstName':
        form.firstName = event.target.value;
        break;
      case 'lastName':
        form.lastName = event.target.value;
        break;
      case 'department':
        form.department = event.target.value;
        break;
      default:
        break;
    }
    this.setState({ form: form });
  };

  handleSubmit = async () => {
    const { firstName, lastName, department } = this.state.form;
    const { type } = this.props.user;
    const user = {
      ...this.props.user,
      firstName: firstName,
      lastName: lastName,
      department_id: type === CONSTANTS.ADMIN ? '0' : department,
    };
    const succeeded = await this.props.updateUserData(user);
    if (!succeeded) {
      this.setState({ failed: true });
    }
  };

  render(): React.ReactNode {
    const { firstName, lastName, department } = this.state.form;
    const { failed } = this.state;
    const { user } = this.props;

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
        {failed && (
          <Alert variant='danger'>
            Problem updating profile, please try again.
          </Alert>
        )}
        <Card>
          <CardHeader className='text-center'>
            <h2>Profile Incomplete</h2>
          </CardHeader>
          <CardBody className='text-center'>
            Please complete your profile by completing the following form.
          </CardBody>
          <CardBody>
            <Form>
              <FormGroup>
                <FormLabel>First Name</FormLabel>
                <FormControl
                  id='firstName'
                  type='text'
                  value={firstName}
                  onChange={this.onChange}
                ></FormControl>
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  id='lastName'
                  type='text'
                  value={lastName}
                  onChange={this.onChange}
                ></FormControl>
                {user.type === CONSTANTS.USER && [
                  <FormLabel key={1}>Department</FormLabel>,
                  <FormSelect
                    key={2}
                    id={'department'}
                    data-testid={'select-department'}
                    onChange={this.onChange}
                    value={department}
                  >
                    <option value={''}>--Select A Department</option>
                    {departmentsList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </FormSelect>,
                ]}
              </FormGroup>
            </Form>
            <Button onClick={this.handleSubmit}>Update Profile</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.account.user,
});
const mapDispatchToProps = {
  updateUserData,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(IncompleteProfile);
