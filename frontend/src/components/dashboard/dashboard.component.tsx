import React, { Component } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import {
  Button,
  CardHeader,
  Container,
  DropdownItem,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faHome,
  faWrench,
  faChartLine,
  faDollarSign,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import AdminDashboard from './components/admin-dashboard';
import UserDashboard from './components/user-dashboard';
import { AppState } from '../../types/app.types';
import {
  getNotifications,
  getUserData,
  logout,
} from '../../store/actions/auth.action';
import BillingComponent from '../billing/billing.component';
import notificationsComponent from '../notifications/notifications.component';
import PrintersComponent from '../printers/printers.component';
import ProfileComponent from '../profile/profile.component';
import TrackingComponent from '../tracking/tracking.component';
import {
  getAllPrinters,
  getDepartmentMetrics,
  getDepartmentPrinters,
} from '../../store/actions/printer.actions';
import MaintenanceComponent from '../maintenance/maintenance.component';
import { getDepartmentBillingHistory } from '../../store/actions/billing.actions';
import { getDepartmentMaintenanceRequests } from '../../store/actions/maintenance.actions';
import { getDepartments } from '../../store/actions/data.action';

import { CONSTANTS } from '../../store/constants';
import withRouter from '../../hooks/withRouter.hook';
import withDispatch from '../../hooks/dispatch.hook';

const { SET_USER_TYPE } = CONSTANTS;

interface State {
  isOpen: boolean;
}

class DashboardComponent extends Component<DashboardProps, State> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  componentDidMount(): void {
    this.props
      .getDepartments()
      .then(() =>
        this.props.getUserData().then(() => this.props.getNotifications()),
      );
    if (this.props.user?.type === 'Admin') {
      this.initAdmin();
    } else {
      this.initUser();
    }
  }

  initUser = () => {
    const printerIds = this.props.printer.printers.map((v) => v.id);
    this.props
      .getDepartmentPrinters()
      .then(() =>
        this.props
          .getDepartmentMetrics(printerIds)
          .then(() =>
            this.props
              .getDepartmentMaintenanceRequests(printerIds)
              .then(() => this.props.getDepartmentBillingHistory()),
          ),
      );
  };

  initAdmin = () => {
    this.props.getAllPrinters();
  };

  toggleOpen = () => {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
    }));
  };

  toggleUserType = () => {
    const { dispatch, user } = this.props;
    if (user?.type !== 'Admin') {
      dispatch({ type: SET_USER_TYPE, payload: 'Admin' });
    } else {
      dispatch({ type: SET_USER_TYPE, payload: 'User' });
    }
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    const { user } = this.props.auth;
    const { pathname } = this.props.router.location;
    const { auth, printer } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="d-flex flex-column">
        <Navbar className="bg-primary">
          <Container fluid>
            <Nav>
              <Navbar.Brand as={Button} onClick={this.toggleOpen}>
                <FontAwesomeIcon icon={faBars} color={'white'} />
                <img
                  alt="logo"
                  src="navlogo.png"
                  height="30"
                  className="d-inline-block align-top"
                ></img>
              </Navbar.Brand>
              <Button onClick={this.toggleUserType}>Switch User Type</Button>
            </Nav>

            <Nav>
              <NavDropdown
                align={'end'}
                title={
                  <img
                    alt="avatar"
                    className="rounded-circle"
                    src="avatar.jpg"
                    width={30}
                    height={30}
                  ></img>
                }
              >
                <CardHeader>
                  <DropdownItem as={Link} to={'/profile'}>
                    Settings
                  </DropdownItem>
                  <DropdownItem as={Link} to={'/notifications'}>
                    Notifications
                  </DropdownItem>
                  <Button
                    className="w-100 text-left"
                    variant="secondary"
                    onClick={this.logout}
                  >
                    Logout
                  </Button>
                </CardHeader>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
        <div className="d-flex">
          <div
            style={{
              height: 'calc(100vh - 50px)',
              width: '250px',
              padding: '0px .5em',
              background: 'white',
              display: isOpen ? 'block' : 'none',
            }}
          >
            <Navbar className="h-100">
              <Nav
                className="flex-column h-100 w-100"
                activeKey={pathname}
                variant="pills"
              >
                <Nav.Item>
                  <Nav.Link as={Link} eventKey={'/dashboard'} to={'/dashboard'}>
                    <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} eventKey={'/printers'} to={'/printers'}>
                    <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon> Printers
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    eventKey={'/maintenance'}
                    to={'/maintenance'}
                  >
                    <FontAwesomeIcon icon={faWrench}></FontAwesomeIcon>{' '}
                    Maintenance
                  </Nav.Link>
                  <Nav.Link as={Link} eventKey={'/tracking'} to={'/tracking'}>
                    <FontAwesomeIcon icon={faChartLine}></FontAwesomeIcon>{' '}
                    Tracking
                  </Nav.Link>
                  <Nav.Link as={Link} eventKey={'/billing'} to={'/billing'}>
                    <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>{' '}
                    Billing
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar>
          </div>
          <div
            style={{
              height: '100vh',
              overflowY: 'scroll',
              flex: '1 1 auto',
            }}
          >
            <Container fluid className="mt-3">
              <Routes>
                <Route path="*" element={<Navigate to="/dashboard" />}></Route>
                <Route
                  path="dashboard"
                  element={
                    user?.type === 'Admin' ? (
                      <AdminDashboard />
                    ) : (
                      <UserDashboard auth={auth} printer={printer} />
                    )
                  }
                ></Route>
                <Route path="billing" Component={BillingComponent}></Route>
                <Route path="printers" Component={PrintersComponent}></Route>
                <Route
                  path="maintenance"
                  Component={MaintenanceComponent}
                ></Route>
                <Route path="tracking" Component={TrackingComponent}></Route>
                <Route path="profile" Component={ProfileComponent}></Route>
                <Route
                  path="notifications"
                  Component={notificationsComponent}
                ></Route>
              </Routes>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, props: any) => {
  return {
    auth: state.auth,
    data: state.data,
    printer: state.printer,
    billing: state.billing,
    maintenance: state.maintenance,
    router: props.router,
    dispatch: props.dispatch,
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  getUserData,
  getDepartmentPrinters,
  getAllPrinters,
  getDepartmentMetrics,
  getNotifications,
  getDepartmentBillingHistory,
  getDepartmentMaintenanceRequests,
  getDepartments,
  logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type DashboardProps = ConnectedProps<typeof connector>;

export default withDispatch(withRouter(connector(DashboardComponent)));
