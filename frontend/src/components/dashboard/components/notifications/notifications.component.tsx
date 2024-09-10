import React, { Component, ReactNode } from 'react';
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

class NotificationsComponent extends Component<NotificationsProps> {
  dismissNotification = (event: any) => {
    event.preventDefault();
  };

  render(): ReactNode {
    const { notifications } = this.props;

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
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    notifications: state.account.notifications,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type NotificationsProps = ConnectedProps<typeof connector>;

export default connector(NotificationsComponent);
