import React, { Component } from 'react';
import { AppState } from '../../../../types/app.types';
import { connect, ConnectedProps } from 'react-redux';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
  Stack,
  Table,
} from 'react-bootstrap';
import { CONSTANTS } from '../../../../config/constants';
import {
  getAllUsers,
  register,
  updateUserType,
} from '../../../../store/actions/auth.action';
import { User } from '../../../../types/auth.types';

interface State {
  users: User[];
  userTypes: { [key: string]: string };
  updated: boolean;
  added: boolean;
  adding: boolean;
}

class AdminSettings extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      users: [],
      userTypes: {},
      updated: false,
      adding: false,
      added: false,
    };
  }

  toggleAdding = () => {
    this.setState((prev) => ({
      adding: !prev.adding,
    }));
  };

  async componentDidMount(): Promise<void> {
    const users = await this.props.getAllUsers();
    let { userTypes } = this.state;
    if (users) {
      users?.forEach((user) => {
        userTypes[user.id] = user.type;
      });
      this.setState({ users: users });
      this.setState({ userTypes: userTypes });
    }
  }

  updateUserType = (event: any) => {
    const { userTypes } = this.state;
    userTypes[event.target.id] = event.target.value;
    this.setState({ userTypes: userTypes });
  };

  submitChanges = async () => {
    const { userTypes, users } = this.state;
    let userIds: string[] = [];
    users.forEach((user) => {
      if (userTypes[user.id] !== user.type) userIds.push(user.id);
    });
    if (userIds.length > 0) {
      const result = await this.props.updateUserType(userIds);
      if (result) {
        this.setState({ updated: true });
        this.props.getAllUsers();
      }
    }
  };

  createUser = async (event: any) => {
    event.preventDefault();
    const email = event.target[0].value;
    const pass = event.target[1].value;
    const result = await this.props.register(email, pass);
    if (result) {
      this.setState({ added: true });
      event.target[0].value = '';
      event.target[1].value = '';
    }
  };

  render(): React.ReactNode {
    const { users, userTypes, updated, adding, added } = this.state;

    return (
      <div data-testid='admin-settings-component'>
        <style>
          {`.changed td {
                    background-color: lightyellow!important;
                }`}
        </style>
        {updated && <Alert>Users Updated</Alert>}
        {added && <Alert>User Created</Alert>}
        <Card>
          <CardHeader className='d-flex'>
            <h2 className='me-auto'>Admin Settings</h2>
            <Button onClick={this.toggleAdding}>Add New User</Button>
          </CardHeader>
        </Card>
        {adding && (
          <Card>
            <CardBody>
              <Form onSubmit={this.createUser}>
                <FormGroup as={Stack} gap={1} direction={'horizontal'}>
                  <FormControl type='email' placeholder='Email'></FormControl>
                  <FormControl
                    type='text'
                    placeholder='Temp Password'
                  ></FormControl>
                  <Button type='submit'>Submit</Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        )}
        <div className='d-flex justify-content-between mt-3'>
          <div className='me-auto'></div>
          <Button onClick={this.submitChanges}>Update</Button>
        </div>
        <Table className='mt-3'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              let change = userTypes[user.id] !== user.type;
              return (
                <tr className={change ? 'changed' : ''} key={user.id}>
                  <td>{user.email}</td>
                  <td>
                    <FormSelect
                      id={user.id}
                      value={userTypes[user.id]}
                      onChange={this.updateUserType}
                    >
                      <option value={CONSTANTS.ADMIN}>{CONSTANTS.ADMIN}</option>
                      <option value={CONSTANTS.USER}>{CONSTANTS.USER}</option>
                    </FormSelect>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className='d-flex justify-content-end'>
          <Button onClick={this.submitChanges}>Update</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {
  updateUserType,
  getAllUsers,
  register,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AdminSettings);
