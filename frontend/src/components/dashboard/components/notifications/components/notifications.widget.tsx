import React, { Component, ReactNode } from 'react';
import { Badge, Card, CardBody, NavDropdown } from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../../../../../types/auth.types';
import { AppState } from '../../../../../types/app.types';

class NotificationsWidget extends Component<NotificationsProps> {
  dismissNotification = (event: any) => {
    event.preventDefault();
  };

  render(): ReactNode {
    const { notifications } = this.props;

    return (
      <NavDropdown
        align={'end'}
        title={<FontAwesomeIcon icon={faBell} color={'white'} />}
      >
        <strong>Notifications</strong>
        <Card
          style={{
            maxHeight: '300px',
            overflowY: 'scroll',
          }}
        >
          {notifications?.map((note: Notification) => (
            <Card style={{ width: '300px' }} key={note.id}>
              <div>
                <strong className='me-auto'>{note.notification_date}</strong>
                <span>{!note.is_read && <Badge bg='danger'>!</Badge>}</span>
              </div>
              <CardBody>{note.message}</CardBody>
            </Card>
          ))}
        </Card>
      </NavDropdown>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    notifications: state.auth.notifications,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type NotificationsProps = ConnectedProps<typeof connector>;

export default connector(NotificationsWidget);
