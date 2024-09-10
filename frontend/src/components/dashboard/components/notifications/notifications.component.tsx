import React from 'react';
import {
  Badge,
  Card,
  CardHeader,
  Container,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
} from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import { AppState, Notification } from '../../../../types';

const mapStateToProps = (state: AppState) => {
  return {
    notifications: state.account.notifications,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type NotificationsProps = ConnectedProps<typeof connector>;

const NotificationsComponent = (props: NotificationsProps) => {
  const dismissNotification = (event: any) => {
    event.preventDefault();
  };

  const { notifications } = props;

  return (
    <Container>
      <Card>
        <CardHeader>
          <h2>Notifications</h2>
        </CardHeader>
      </Card>
      <ToastContainer>
        {notifications?.map((note: Notification) => (
          <Toast key={note.id}>
            <ToastHeader closeButton={false}>
              <strong className='me-auto'>{note.notification_date}</strong>
              {!note.is_read && <Badge bg='danger'>!</Badge>}
            </ToastHeader>
            <ToastBody>{note.message}</ToastBody>
          </Toast>
        ))}
      </ToastContainer>
    </Container>
  );
};

export default connector(NotificationsComponent);
