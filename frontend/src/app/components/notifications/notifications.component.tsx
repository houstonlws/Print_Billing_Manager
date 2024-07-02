import React, { Component, ReactNode } from "react";
import {
    Badge,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
} from "react-bootstrap";
import { AppState } from "../../types/app.types";
import { ConnectedProps, connect } from "react-redux";

class NotificationsComponent extends Component<NotificationsProps> {
  dismissNotification = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
  };

  render(): ReactNode {
    const { notifications } = this.props;

    return (
      <>
        <strong>Notifications</strong>
        <ToastContainer>
          {notifications?.map((note) => (
            <Toast key={note.id}>
              <ToastHeader closeButton={false}>
                <strong className="me-auto">{note.notification_date}</strong>
                {!note.is_read && (
                <Badge bg='danger'>!</Badge>
                )}
              </ToastHeader>
              <ToastBody>{note.message}</ToastBody>
            </Toast>
          ))}
        </ToastContainer>
      </>
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

export default connector(NotificationsComponent);
