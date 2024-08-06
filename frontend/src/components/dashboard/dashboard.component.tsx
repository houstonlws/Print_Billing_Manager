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
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faWrench,
  faChartLine,
  faDollarSign,
  faPrint,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { AppState } from '../../types/app.types';
import {
  getAllUsers,
  getNotifications,
  getUserData,
  logout,
} from '../../store/actions/auth.action';
import BillingComponent from './components/billing/billing.component';
import notificationsComponent from './components/notifications/notifications.component';
import PrintersComponent from './components/printers/printers.component';
import ProfileComponent from './components/profile/profile.component';
import TrackingComponent from './components/tracking/tracking.component';
import {
  getAllPrinters,
  getDepartmentMaintenanceRequests,
  getDepartmentMetrics,
  getDepartmentPrinters,
} from '../../store/actions/printer.actions';
import MaintenanceComponent from './components/maintenance/maintenance.component';
import { getDepartmentBillingHistory } from '../../store/actions/billing.actions';

import { CONSTANTS } from '../../config/constants';
import withRouter from '../../hooks/withRouter.hook';
import NotificationsWidget from './components/notifications/components/notifications.widget';
import adminSettingsComponent from './components/admin-settings/admin-settings.component';
import { departments } from '../../config/app-data';

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
      await this.props.getNotifications(user.id);
      await this.props.getAllPrinters();
      await this.props.getAllUsers();
    } else if (user?.type === CONSTANTS.USER) {
      await this.props.getNotifications(user.id);
      await this.props.getDepartmentPrinters(user.department_id);
      await this.props.getDepartmentMetrics(user.department_id);
      await this.props.getDepartmentMaintenanceRequests(user.department_id);
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
        await this.props.getDepartmentPrinters(event.target.value);
        await this.props.getDepartmentMetrics(event.target.value);
        await this.props.getDepartmentBillingHistory(event.target.value);
        await this.props.getDepartmentMaintenanceRequests(event.target.value);
        break;
    }
  };

  render() {
    const { pathname } = this.props.router.location;
    const { isOpen, department } = this.state;
    const { user } = this.props.auth;

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
                  <option value={''}>--Select A Department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </FormSelect>
                <Button style={{ whiteSpace: 'nowrap' }}>View All</Button>
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
          <div
            style={{
              height: 'calc(100vh - 50px)',
              width: '250px',
              padding: '0px .5em',
              background: 'white',
              display: isOpen ? 'block' : 'none',
            }}
          >
            <Navbar className='h-100'>
              <Nav
                className='flex-column h-100 w-100'
                activeKey={pathname}
                variant='pills'
              >
                <Nav.Item>
                  {user?.type === CONSTANTS.ADMIN && (
                    <Nav.Link as={Link} eventKey={'/settings'} to={'/settings'}>
                      <FontAwesomeIcon icon={faGear}></FontAwesomeIcon> Settings
                    </Nav.Link>
                  )}
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
                      Component={adminSettingsComponent}
                    ></Route>,
                  ]
                ) : (
                  <Route path='*' element={<Navigate to='/printers' />}></Route>
                )}
                <Route path='billing' Component={BillingComponent}></Route>
                <Route path='printers' Component={PrintersComponent}></Route>
                <Route
                  path='maintenance'
                  Component={MaintenanceComponent}
                ></Route>
                <Route path='tracking' Component={TrackingComponent}></Route>
                <Route path='profile' Component={ProfileComponent}></Route>
                <Route
                  path='notifications'
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

const connector = connect(
  (state: AppState, props: any) => ({
    auth: state.auth,
    billing: state.billing,
    router: props.router,
    dispatch: props.dispatch,
  }),
  {
    getUserData,
    getDepartmentPrinters,
    getAllPrinters,
    getDepartmentMetrics,
    getNotifications,
    getDepartmentBillingHistory,
    getDepartmentMaintenanceRequests,
    getAllUsers,
    logout,
  }
);
type DashboardProps = ConnectedProps<typeof connector>;

export default withRouter(connector(DashboardComponent));
