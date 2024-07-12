import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
  CardTitle,
} from "react-bootstrap";
import { User } from "../../../types/auth.types";

interface Props {
  user: User | null | void;
}

class ProfileWidget extends Component<Props> {
  render(): React.ReactNode {
    const { user } = this.props;

    return (
      <Card style={{ width: "18em" }}>
        <CardHeader>Profile</CardHeader>
        <CardImg src="avatar.jpg"></CardImg>
        <CardBody>
          <CardTitle>
            {user?.firstName} {user?.lastName}
          </CardTitle>
          <CardText>{user?.department_id}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default ProfileWidget;
