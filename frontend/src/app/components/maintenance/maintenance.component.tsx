import React, { Component, ReactNode } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from "../../types/app.types";
import { MaintenanceRequest } from "../../types/maintenance.types";
import { getMaintenanceRequests } from "../../store/actions/maintenance.actions";
import AddRequest from "./components/add-request";
import RequestList from "./components/request-list";
import { Stack } from "react-bootstrap";

interface State {
    requests: MaintenanceRequest[]
}

class MaintenanceComponent extends Component<Props, State> {

    render(): ReactNode {
        
        const { requests } = this.props.maintenance

        return (
            <Stack gap={3}>
                <AddRequest></AddRequest>
                <RequestList requests={requests}></RequestList>
            </Stack>
        )
    }

}

const mapStateToProps = (state: AppState) => ({
    maintenance: state.maintenance,
    printer: state.printer
});

const mapDispatchToProps = {
};

type Props = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MaintenanceComponent);