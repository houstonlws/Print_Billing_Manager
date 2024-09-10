import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../types/app.types';
import { Nav, Navbar } from 'react-bootstrap';
import {
  faGear,
  faPrint,
  faWrench,
  faChartLine,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { CONSTANTS } from '../../../config/constants';

interface Props {
  isOpen: boolean;
}
const mapStateToProps = (state: AppState, props: any) => ({
  account: state.account,
  auth: state.auth,
  router: props.router,
});
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & Props;

const MenuSide = (props: ReduxProps) => {
  const { pathname } = useLocation();
  const {
    account: { user },
    isOpen,
  } = props;
  return (
    <div
      style={{
        height: 'calc(100vh - 50px)',
        width: isOpen ? '250px' : '70px',
        padding: '0px .5em',
        background: 'white',
        overflow: 'hidden',
        transition: 'ease-in 250ms',
      }}
    >
      <Navbar className='h-100'>
        <Nav
          className='flex-column h-100 w-100'
          activeKey={pathname}
          variant='pills'
        >
          <style>
            {`.side-text {
                    white-space: no-wrap;
                    opacity: ${isOpen ? '100;' : '0;'}
                    width: ${isOpen ? '100%;' : '0;'}
                    transition: ease-in-out 250ms;
                    font-size: 1.1em;
                }
                .side-icon {
                    width: 40px
                }
                .side-link {
                  display: flex;
                  align-items: center;
                  margin: 10px 0;
                }`}
          </style>

          <Nav.Item>
            {user?.type === CONSTANTS.ADMIN && (
              <Nav.Link
                as={Link}
                eventKey={'/settings'}
                to={'/settings'}
                className='side-link'
              >
                <span>
                  <FontAwesomeIcon
                    className='side-icon'
                    icon={faGear}
                    size={'xl'}
                  ></FontAwesomeIcon>
                </span>
                <span className='side-text'>Settings</span>
              </Nav.Link>
            )}
            <Nav.Link
              as={Link}
              eventKey={'/printers'}
              to={'/printers'}
              className='side-link'
            >
              <span className='d-flex align-items-center'>
                <FontAwesomeIcon
                  className='side-icon'
                  icon={faPrint}
                  size={'xl'}
                ></FontAwesomeIcon>
              </span>
              <span className='side-text'>Printers</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey={'/maintenance'}
              to={'/maintenance'}
              className='side-link'
            >
              <span>
                <FontAwesomeIcon
                  className='side-icon'
                  icon={faWrench}
                  size='xl'
                ></FontAwesomeIcon>
              </span>
              <span className='side-text'>Maintenance</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey={'/tracking'}
              to={'/tracking'}
              className='side-link'
            >
              <span>
                <FontAwesomeIcon
                  className='side-icon'
                  icon={faChartLine}
                  size='xl'
                ></FontAwesomeIcon>
              </span>
              <span className='side-text'>Tracking</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey={'/billing'}
              to={'/billing'}
              className='side-link'
            >
              <span>
                <FontAwesomeIcon
                  className='side-icon'
                  icon={faDollarSign}
                  size='xl'
                ></FontAwesomeIcon>
              </span>
              <span className='side-text'>Billing</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  );
};

export default connector(MenuSide);
