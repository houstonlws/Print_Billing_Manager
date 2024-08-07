import React, { Component, FormEvent, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  FormSelect,
  Row,
} from 'react-bootstrap';
import { AppState } from '../../../../types/app.types';
import { updateUserData } from '../../../../store/actions/auth.action';
import { User } from '../../../../types/auth.types';
import { departments } from '../../../../config/app-data';
import { CONSTANTS } from '../../../../config/constants';

type ProfileState = {
  firstName: string;
  lastName: string;
  department_id: string;
  email: string;
  phone: string;
  status?: string | null;
};

class ProfileComponent extends Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      firstName: props.user?.firstName || '',
      lastName: props.user?.lastName || '',
      department_id: props.user?.department_id || '',
      email: props.user?.email || '',
      phone: props.user?.phone || '',
      status: null,
    };
  }

  onChange = (event: any) => {
    switch (event.target.id) {
      case 'firstName':
        this.setState({ firstName: event.target.value });
        break;
      case 'lastName':
        this.setState({ lastName: event.target.value });
        break;
      case 'department':
        this.setState({ department_id: event.target.value });
        break;
      case 'email':
        this.setState({ email: event.target.value });
        break;
      case 'phone':
        this.setState({ phone: event.target.value });
        break;
      default:
    }
  };

  handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, department_id, phone, email } = this.state;
    const { type, id } = this.props.user;

    const user: User = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      department_id: type === CONSTANTS.USER ? department_id : '0',
      phone: phone,
      email: email,
      type: type,
    };
    const result = await this.props.updateUserData(user);
    if (result) {
      this.setState({ status: 'success' });
    } else {
      this.setState({ status: 'danger' });
    }
  };

  render(): ReactNode {
    const { firstName, lastName, email, phone, department_id, status } =
      this.state;

    const { type } = this.props.user;
    return (
      <div data-testid='profile-component'>
        <h2>User Profile</h2>
        {status !== null && (
          <Alert variant={status}>
            {status === 'danger'
              ? 'Error updating profile'
              : 'Updated Profile Successfully'}
          </Alert>
        )}

        <Card>
          <CardBody>
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  First Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type='text'
                    id='firstName'
                    placeholder={'First Name'}
                    value={firstName}
                    onChange={this.onChange}
                  ></Form.Control>
                </Col>
                <Form.Label column sm={2}>
                  Last Name:
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type='text'
                    id='lastName'
                    placeholder='Last Name'
                    onChange={this.onChange}
                    value={lastName}
                  ></Form.Control>
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
                    onChange={this.onChange}
                    value={email}
                  ></Form.Control>
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
                    onChange={this.onChange}
                    value={phone}
                  ></Form.Control>
                </Col>
              </FormGroup>
              <Form.Group as={Row}>
                <Col sm={10}>
                  {type === CONSTANTS.USER && [
                    <Form.Label key={1} column sm={2}>
                      Department:
                    </Form.Label>,
                    <FormSelect
                      key={2}
                      className='form-control'
                      id='department'
                      data-testid='department'
                      onChange={this.onChange}
                      value={department_id}
                    >
                      <option value=''>--Select a Department</option>
                      {departments?.map((department) => (
                        <option value={department.id} key={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </FormSelect>,
                  ]}
                </Col>
              </Form.Group>
              <Button data-testid='update-user-submit' type='submit'>
                Update
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  updateUserData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProfileProps = ConnectedProps<typeof connector>;

export default connector(ProfileComponent);
