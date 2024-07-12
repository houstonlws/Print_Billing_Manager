import React, { Component, ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Stack } from "react-bootstrap";
import { AppState } from "../../types/app.types";
import { MaintenanceRequest } from "../../types/maintenance.types";
import AddRequest from "./components/add-request";
import RequestList from "./components/request-list";

interface State {
  requests: MaintenanceRequest[];
}

class MaintenanceComponent extends Component<Props, State> {
  render(): ReactNode {
    const { requests } = this.props.maintenance;
    const { type } = this.props;

    return (
      <Stack gap={3}>
        {type === "User" && <AddRequest></AddRequest>}
        <RequestList requests={requests}></RequestList>
      </Stack>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  maintenance: state.maintenance,
  printer: state.printer,
  type: state.auth?.user?.type,
});

const mapDispatchToProps = {};

type Props = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MaintenanceComponent);
