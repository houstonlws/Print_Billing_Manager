import React, { Component, ReactNode } from "react";
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from "../../types/app.types";
import { MaintenanceRequest } from "../../types/maintenance.types";
import { getMaintenanceRequests } from "../../store/actions/maintenance.actions";
import AddRequest from "./components/add-request";
import RequestList from "./components/request-list";

interface State {
    requests: MaintenanceRequest[]
}

class MaintenanceComponent extends Component<Props, State> {

    componentDidMount(): void {
        const printers = this.props.printer.printers.map(p => p.id)
        this.props.getMaintenanceRequests(printers)
    }

    render(): ReactNode {
        
        const { requests } = this.props.maintenance

        return (
            <div>
                <AddRequest></AddRequest>
                <RequestList requests={requests}></RequestList>
            </div>
        )
    }

}

const mapStateToProps = (state: AppState) => ({
    maintenance: state.maintenance,
    printer: state.printer
});

const mapDispatchToProps = {
    getMaintenanceRequests
};

type Props = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MaintenanceComponent);