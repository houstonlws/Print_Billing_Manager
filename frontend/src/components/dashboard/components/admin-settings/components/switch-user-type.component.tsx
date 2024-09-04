import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState, TypeMap } from '../../../../../types';
import { Alert, Button, Card, CardBody, FormSelect } from 'react-bootstrap';
import { CONSTANTS } from '../../../../../config/constants';
import { getAllUsers, updateUserType } from '../../../../../store/actions';

interface State {
  updated: boolean;
  switchedType: TypeMap<boolean>;
}

class SwitchUserType extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      updated: false,
      switchedType: {},
    };
  }

  async componentDidMount() {
    await this.props.getAllUsers();
  }

  updateUserType = (event: any) => {
    const { switchedType } = this.state;
    if (switchedType[event.target.id]) {
      delete switchedType[event.target.id];
    } else {
      switchedType[event.target.id] = true;
    }
    this.setState({ switchedType: switchedType });
  };

  submitChanges = async () => {
    const { switchedType } = this.state;
    let userIds: string[] = [];
    Object.entries(switchedType).forEach((item) => {
      userIds.push(item[0]);
    });
    if (userIds.length > 0) {
      const result = await this.props.updateUserType(userIds);
      if (result) {
        this.setState({ updated: true });
        this.props.getAllUsers();
        window.location.reload();
      }
    }
  };

  render(): React.ReactNode {
    const { users } = this.props.admin;
    const { updated, switchedType } = this.state;
    return (
      <Card>
        <style>
          {`.changed {
                    background-color: lightyellow!important;
                }`}
        </style>
        <CardBody>
          {updated && <Alert>Users Updated</Alert>}

          <div className='d-flex'>
            <h3 className='me-auto'>Set User Type</h3>
            <Button onClick={this.submitChanges}>Update</Button>
          </div>
          {users?.map((user) => {
            let change = switchedType[user.id];
            let val = user.type;
            if (change) {
              val =
                user.type === CONSTANTS.ADMIN
                  ? CONSTANTS.USER
                  : CONSTANTS.ADMIN;
            }
            return (
              <div
                className={`d-flex ${change ? 'changed' : ''}`}
                key={user.id}
              >
                <div className='w-100'>{user.email}</div>
                <div className='w-100'>
                  <FormSelect
                    id={user.id}
                    value={val}
                    onChange={this.updateUserType}
                  >
                    <option value={CONSTANTS.ADMIN}>{CONSTANTS.ADMIN}</option>
                    <option value={CONSTANTS.USER}>{CONSTANTS.USER}</option>
                  </FormSelect>
                </div>
              </div>
            );
          })}
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  admin: state.admin,
});
const mapDispatchToProps = {
  getAllUsers,
  updateUserType,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export default connector(SwitchUserType);
