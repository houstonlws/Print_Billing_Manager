import React, { Component } from 'react';
import { AppState, PriceConfig, User } from '../../../../types';
import { connect, ConnectedProps } from 'react-redux';
import { Stack } from 'react-bootstrap';
import {
  addPriceProfile,
  getAllUsers,
  getPriceProfile,
  getPriceProfileList,
  register,
  setPriceProfile,
  updateUserData,
  updateUserType,
} from '../../../../store/actions';
import SwitchUserTypeComponent from './components/switch-user-type.component';
import AddUserComponent from './components/add-user.component';
import PriceProfileComponent from './components/price-profile.component';

interface State {
  priceProfile: PriceConfig;
  selectedProfile: string;
}

class AdminSettings extends Component<ReduxProps, State> {
  render(): React.ReactNode {
    return (
      <div data-testid='admin-settings-component'>
        <Stack gap={3}>
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

const mapDispatchToProps = {
  updateUserType,
  getAllUsers,
  register,
  addPriceProfile,
  setPriceProfile,
  updateUserData,
  getPriceProfile,
  getPriceProfileList,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AdminSettings);
