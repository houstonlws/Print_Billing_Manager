import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../types/app.types';
import {
  Button,
  CardHeader,
  Container,
  DropdownItem,
  FormSelect,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { departmentsList } from '../../../config/app-data';
import { CONSTANTS } from '../../../config/constants';
import NotificationsWidget from '../components/notifications/components/notifications.widget';
import {
  getAllData,
  getAllDataUser,
  logout,
} from '../../../store/actions/auth.action';

interface State {
  department: string;
}

class MenuTop extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      department: '',
    };
  }

  toggleOpen = () => {};

  render(): React.ReactNode {
    return <></>;
  }
}
const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  getAllData,
  getAllDataUser,
  logout,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default connector(MenuTop);
