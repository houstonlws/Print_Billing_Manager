import React from 'react';
import { AppState } from '../../../../types';
import { connect, ConnectedProps } from 'react-redux';
import { Card, CardHeader, Stack } from 'react-bootstrap';
import SwitchUserTypeComponent from './components/switch-user-type.component';
import AddUserComponent from './components/add-user.component';
import PriceProfileComponent from './components/price-profile.component';

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

const AdminSettings = (props: ReduxProps) => {
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
};

export default connector(AdminSettings);
