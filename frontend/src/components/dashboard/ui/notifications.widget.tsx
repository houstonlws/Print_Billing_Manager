import React, { Component, ReactNode, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardBody,
  NavDropdown,
  Toast,
  ToastBody,
  ToastHeader,
} from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { AppState, Notification } from '../../../types';
import { getNotifications } from '../../../store/actions';
import { CONSTANTS } from '../../../config/constants';

const mapStateToProps = (state: AppState) => {
  return {
    account: state.account,
    auth: state.auth,
  };
};
const mapDispatchToProps = { getNotifications };
const connector = connect(mapStateToProps, mapDispatchToProps);
type NotificationsProps = ConnectedProps<typeof connector>;

const NotificationsWidget = (props: NotificationsProps) => {
  const [notifications, setNotifications] = useState<Notification[]>();

  useEffect(() => {
    const onMount = async () => {
      const { user } = props.account;
      const notifications =
        user.type === CONSTANTS.ADMIN
          ? await props.getNotifications(undefined, true)
          : await props.getNotifications(user.department_id, true);
      setNotifications(notifications);
    };
    onMount();
  }, []);

  const dismissNotification = (event: any) => {
    event.preventDefault();
  };

  return (
    <NavDropdown
      className='btn btn-primary'
      align={'end'}
      title={<FontAwesomeIcon size={'xl'} icon={faBell} color={'white'} />}
    >
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'scroll',
          padding: '0 5px',
        }}
      >
        {notifications?.map((note: Notification) => (
          <Toast style={{ width: '300px' }} key={note.id}>
            <ToastHeader>
              <strong className='me-auto'>{note.notification_date}</strong>
              <span>
                {note.is_read === '0' && <Badge bg='danger'>!</Badge>}
              </span>
            </ToastHeader>
            <ToastBody>{note.message}</ToastBody>
          </Toast>
        ))}
      </div>
    </NavDropdown>
  );
};

export default connector(NotificationsWidget);
