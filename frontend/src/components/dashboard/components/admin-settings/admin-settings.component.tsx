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
  FormLabel,
  FormSelect,
  Stack,
  Table,
} from 'react-bootstrap';
import { CONSTANTS } from '../../../../config/constants';
import {
  getAllUsers,
  updateUserType,
} from '../../../../store/actions/auth.action';

interface State {
  userTypes: { [key: string]: string };
  updated: boolean;
  adding: boolean;
}

class AdminSettings extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      userTypes: {},
      updated: false,
      adding: false,
    };
  }

  toggleAdding = () => {
    this.setState((prev) => ({
      adding: !prev.adding,
    }));
  };

  componentDidMount(): void {
    let { userTypes } = this.state;
    this.props.users.forEach((user) => {
      userTypes[user.id] = user.type;
    });
    this.setState({ userTypes: userTypes });
  }

  updateUserType = (event: any) => {
    const { userTypes } = this.state;
    userTypes[event.target.id] = event.target.value;
    this.setState({ userTypes: userTypes });
  };

  submitChanges = async () => {
    const { users } = this.props;
    const { userTypes } = this.state;
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

  render(): React.ReactNode {
    const { users, currentUser } = this.props;
    const { userTypes, updated, adding } = this.state;

    return (
      <div data-testid='admin-settings-component'>
        <style>
          {`.changed td {
                    background-color: lightyellow!important;
                }`}
        </style>
        {updated && <Alert>Users Updated</Alert>}
        <Card>
          <CardHeader className='d-flex'>
            <h2 className='me-auto'>Admin Settings</h2>
            <Button onClick={this.toggleAdding}>Add New User</Button>
          </CardHeader>
        </Card>
        {adding && (
          <Card>
            <CardBody>
              <Form>
                <FormGroup as={Stack} gap={1} direction={'horizontal'}>
                  <FormControl type='email' placeholder='Email'></FormControl>
                  <FormControl
                    type='text'
                    placeholder='Temp Password'
                  ></FormControl>
                  <Button>Submit</Button>
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
            {users
              ?.filter((user) => user.email !== currentUser)
              .map((user) => {
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
                        <option value={CONSTANTS.ADMIN}>
                          {CONSTANTS.ADMIN}
                        </option>
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

const mapStateToProps = (state: AppState) => ({
  users: state.auth.userList,
  currentUser: state.auth.user?.email,
});

const mapDispatchToProps = {
  updateUserType,
  getAllUsers,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AdminSettings);
