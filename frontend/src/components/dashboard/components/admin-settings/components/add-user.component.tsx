import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState, User } from '../../../../../types';
import {
  Alert,
  Button,
  Card,
  CardBody,
  Form,
  FormControl,
} from 'react-bootstrap';
import { getAllUsers, register } from '../../../../../store/actions';

interface State {
  tempUser: User;
  added: boolean;
}

class AddUser extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      tempUser: {
        id: '',
        email: '',
        type: '',
        department_id: '',
      },
      added: false,
    };
  }

  createUser = async () => {
    const { tempUser } = this.state;
    const email = tempUser.email;
    const pass = tempUser.password!;
    const result = await this.props.register(email, pass);
    if (result) this.setState({ added: true });
  };

  changeTempUser = (event: any) => {
    const { tempUser } = this.state;
    switch (event.target.id) {
      case 'user-email':
        tempUser.email = event.target.value;
        break;
      case 'user-temp-pass':
        tempUser.password = event.target.value;
        break;
      default:
        break;
    }
    this.setState({ tempUser: tempUser });
  };

  render(): React.ReactNode {
    const {} = this.props;
    const { added } = this.state;
    return (
      <Card>
        <CardBody>
          <Form onSubmit={this.createUser}>
            <div className='d-flex'>
              <h3 className='me-auto'>Add User</h3>
              <Button type='submit'>Submit</Button>
            </div>
            <FormControl
              id='user-email'
              type='email'
              placeholder='Email'
              onChange={this.changeTempUser}
            ></FormControl>
            <FormControl
              id='user-temp-pass'
              type='text'
              placeholder='Temp Password'
              onChange={this.changeTempUser}
            ></FormControl>
          </Form>
          {added && <Alert>User Created</Alert>}
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  admin: state.admin,
});
const mapDispatchToProps = {
  register,
  getAllUsers,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export default connector(AddUser);
