import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../types/app.types';
import { AuthState } from '../../../types/auth.types';
import { PrinterState } from '../../../types/printer.types';
import ProfileWidget from './profile-widget.component';

type Props = {
  auth: AuthState;
  printer: PrinterState;
};

class UserDashboard extends Component<UserDashboardProps> {
  render(): React.ReactNode {
    const { user } = this.props;

    return (
      <>
        <ProfileWidget user={user}></ProfileWidget>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type UserDashboardProps = ConnectedProps<typeof connector> & Props;

export default connector(UserDashboard);
