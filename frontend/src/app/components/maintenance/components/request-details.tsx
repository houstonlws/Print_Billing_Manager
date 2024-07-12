import React, { Component, ReactNode } from "react";
import { Badge, Card, CardBody, CardHeader } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { MaintenanceRequest } from "../../../types/maintenance.types";
import { Printer } from "../../../types/printer.types";

interface Props {
  request: MaintenanceRequest;
  printer: Printer;
}

interface State {
  isOpen: boolean;
}

class RequestDetails extends Component<DetailsProps, State> {
  constructor(props: DetailsProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleOpen = () => {
    this.setState((prev) => ({
      isOpen: !prev.isOpen,
    }));
  };

  render(): ReactNode {
    const { request, printer } = this.props;
    const { status } = request;

    return (
      <Card className="mt-2">
        <CardHeader className="d-flex">
          <div>
            <strong>Date Issued:</strong> {request.request_date}
          </div>
          <Badge bg={status === "Resolved" ? "success" : "warning"}>
            {" "}
            {request.status}{" "}
          </Badge>
        </CardHeader>
        <CardBody>
          <div>
            <strong>Type:</strong> {request?.maintenance_type}
          </div>
          <div>
            <strong>Description:</strong> {request?.description}
          </div>
          <div>
            <strong>Printer:</strong>
            <ul>
              <li>
                <strong>Serial</strong> {printer?.serial_number}
              </li>
              <li>
                <strong>Location</strong> {printer?.location}
              </li>
              <li>
                <strong>Brand</strong> {printer?.brand}
              </li>
              <li>
                <strong>Model</strong> {printer?.model}
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    );
  }
}

const mstp = () => {
  return {};
};

const connector = connect(mstp);

type DetailsProps = ConnectedProps<typeof connector> & Props;

export default connector(RequestDetails);
