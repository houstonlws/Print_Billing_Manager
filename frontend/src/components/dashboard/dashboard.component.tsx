import React, { Component } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
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
import { AppState } from '../../types';
import {
  getAllData,
  getAllDataUser,
  getUserData,
  logout,
  getCurrentJobs,
  getJobHistory,
  refreshToken,
  getCurrentTotals,
} from '../../store/actions';
import {
  BillingComponent,
  NotificationsComponent,
  PrintersComponent,
  ProfileComponent,
  TrackingComponent,
  MaintenanceComponent,
  AdminSettingsComponent,
} from './components';
import { CONSTANTS } from '../../config/constants';
import IncompleteProfileComponent from './ui/incomplete-profile.component';
import MenuSideComponent from './ui/menu-side.component';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { departmentsList } from '../../config/app-data';
import NotificationsWidget from './components/notifications/components/notifications.widget';
import { store } from '../../store';

interface State {
  isOpen: boolean;
  department: string;
}

class DashboardComponent extends Component<DashboardProps, State> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {
      isOpen: true,
      department: '',
    };
  }

  async componentDidMount(): Promise<void> {
    const { user } = this.props.auth;
    if (user?.type === CONSTANTS.ADMIN) {
      await this.props.getAllData();
      await this.props.getJobHistory();
      await this.props.getCurrentTotals();
    } else if (user?.type === CONSTANTS.USER) {
      console.log(user);
      await this.props.getAllDataUser(user.department_id);
      await this.props.getJobHistory(user.department_id);
      await this.props.getCurrentTotals(user.department_id);
    }
  }

  toggleOpen = () => {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
    }));
  };

  onChange = async (event: any) => {
    switch (event.target.id) {
      case 'department':
        this.setState({ department: event.target.value });
        await this.props.getAllDataUser(event.target.value);
        await this.props.getJobHistory(event.target.value);
        await this.props.getCurrentJobs(event.target.value);
        break;
    }
  };

  render() {
    const { isOpen, department } = this.state;
    const { user, loggedIn } = this.props.auth;
    let completedProfile =
      user.firstName && user.lastName && user.department_id !== '';
    if (!completedProfile && loggedIn) {
      return <IncompleteProfileComponent></IncompleteProfileComponent>;
    } else
      return (
        <div className='d-flex flex-column'>
          <Navbar className='bg-primary'>
            <Container fluid>
              <Nav>
                <Navbar.Brand as={Button} onClick={this.toggleOpen}>
                  <FontAwesomeIcon icon={faBars} color={'white'} />
                  <img
                    alt='logo'
                    src='navlogo.png'
                    height='30'
                    className='d-inline-block align-top'
                  ></img>
                </Navbar.Brand>
              </Nav>

              {user.type === CONSTANTS.ADMIN && (
                <Nav>
                  <FormSelect
                    id={'department'}
                    data-testid={'select-department'}
                    onChange={this.onChange}
                    value={department}
                  >
                    <option value={''}>All Departments</option>
                    {departmentsList.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </FormSelect>
                </Nav>
              )}

              <Nav className='align-items-center'>
                <NotificationsWidget></NotificationsWidget>
                <NavDropdown
                  align={'end'}
                  title={
                    <img
                      alt='avatar'
                      className='rounded-circle'
                      src='avatar.jpg'
                      width={30}
                      height={30}
                    ></img>
                  }
                >
                  <CardHeader>
                    <DropdownItem as={Link} to={'/profile'}>
                      Settings
                    </DropdownItem>
                    <Button
                      className='w-100 text-left'
                      variant='secondary'
                      onClick={this.props.logout}
                    >
                      Logout
                    </Button>
                  </CardHeader>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
          <div className='d-flex'>
            <MenuSideComponent isOpen={isOpen}></MenuSideComponent>
            <div
              style={{
                height: 'calc(100vh - 75px)',
                overflowY: 'scroll',
                flex: '1 1 auto',
              }}
            >
              <Container fluid className='mt-3'>
                <Routes>
                  {user?.type === CONSTANTS.ADMIN ? (
                    [
                      <Route
                        key={'any'}
                        path='*'
                        element={<Navigate to='/settings' />}
                      ></Route>,
                      <Route
                        key={'settings'}
                        path='settings'
                        Component={AdminSettingsComponent}
                      ></Route>,
                    ]
                  ) : (
                    <Route
                      path='*'
                      element={<Navigate to='/printers' />}
                    ></Route>
                  )}
                  <Route
                    path='printers'
                    element={<PrintersComponent departmentId={department} />}
                  ></Route>
                  <Route
                    path='maintenance'
                    Component={MaintenanceComponent}
                  ></Route>
                  <Route
                    path='tracking'
                    element={
                      <TrackingComponent selectedDepartment={department} />
                    }
                  ></Route>
                  <Route
                    path='billing'
                    element={<BillingComponent department={department} />}
                  ></Route>
                  <Route path='profile' Component={ProfileComponent}></Route>
                  <Route
                    path='notifications'
                    Component={NotificationsComponent}
                  ></Route>
                </Routes>
              </Container>
            </div>
          </div>
        </div>
      );
  }
}

const connector = connect(
  (state: AppState, props: any) => ({
    auth: state.auth,
    billing: state.billing,
  }),
  {
    getUserData,
    getAllData,
    getAllDataUser,
    logout,
    getJobHistory,
    getCurrentJobs,
    refreshToken,
    getCurrentTotals,
  }
);

type DashboardProps = ConnectedProps<typeof connector>;

const resetLogoutTimer = () => {
  const lastReset: number = (window as any).lastReset;
  if (lastReset && Date.now() - lastReset > 1000 * 60 * 5) {
  }
  (window as any).lastReset = Date.now();
  clearTimeout((window as any).clearPersistTimeout);
  (window as any).clearPersistTimeout = setTimeout(() => {
    store.dispatch({ type: CONSTANTS.LOGOUT, payload: undefined });
  }, CONSTANTS.FIFTEEN_MINUTES);
};

['click', 'keypress', 'mousemove', 'scroll'].forEach((event: any) => {
  window.addEventListener(event, resetLogoutTimer);
});

resetLogoutTimer();

export default connector(DashboardComponent);
