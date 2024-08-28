import React, { Component } from 'react';
import { AppState } from '../../../../types';
import { connect, ConnectedProps } from 'react-redux';
import { Card, CardHeader, Stack } from 'react-bootstrap';
import SwitchUserTypeComponent from './components/switch-user-type.component';
import AddUserComponent from './components/add-user.component';
import PriceProfileComponent from './components/price-profile.component';

interface State {}

class AdminSettings extends Component<ReduxProps, State> {
  render(): React.ReactNode {
    return (
      <div data-testid='admin-settings-component'>
        <Stack gap={3}>
          <Card>
            <CardHeader>
              <h2>Admin Settings</h2>
            </CardHeader>
          </Card>
          <SwitchUserTypeComponent></SwitchUserTypeComponent>
          <AddUserComponent></AddUserComponent>
          <PriceProfileComponent></PriceProfileComponent>
        </Stack>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  admin: state.admin,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AdminSettings);
