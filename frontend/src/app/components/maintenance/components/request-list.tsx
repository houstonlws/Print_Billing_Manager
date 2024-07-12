import React, { Component, ReactNode } from "react";
import { ConnectedProps, connect } from "react-redux";
import { MaintenanceRequest } from "../../../types/maintenance.types";
import RequestDetails from "./request-details";
import { AppState } from "../../../types/app.types";

interface Props {
  requests: MaintenanceRequest[];
}

class RequestList extends Component<ListProps> {
  render(): ReactNode {
    const { requests, printers } = this.props;

    return (
      <div>
        {requests?.map((request) => (
          <RequestDetails
            key={request.id}
            request={request}
            printer={printers.find((p) => p.id === request.printer_id)!}
          ></RequestDetails>
        ))}
      </div>
    );
  }
}

const mstp = (state: AppState) => {
  return {
    printers: state.printer.printers,
  };
};
const connector = connect(mstp);

type ListProps = ConnectedProps<typeof connector> & Props;

export default connector(RequestList);
