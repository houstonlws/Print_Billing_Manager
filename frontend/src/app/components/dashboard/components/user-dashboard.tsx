import React, { Component } from "react";
import PrinterList from "../../printers/components/printer-list";
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from "../../../types/app.types";
import { AppDispatch } from "../../../store";
import { AuthState } from "../../../types/auth.types";
import { PrinterState } from "../../../types/printer.types";
import InkUsage from "../../tracking/components/ink-usage";
import { ChartData, ChartOptions } from "chart.js";
import { Card, CardHeader } from "react-bootstrap";
import ProfileWidget from "./profile-widget.component";

type Props = {
    auth: AuthState,
    printer: PrinterState,
}

class UserDashboard extends Component<UserDashboardProps> {

    render(): React.ReactNode {
        
        const { printers, metrics } = this.props.printer
        const { user } = this.props

        return (
            <>
              <ProfileWidget user={user}></ProfileWidget>
            </>
        )

    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type UserDashboardProps = ConnectedProps<typeof connector> & Props;

export default connector(UserDashboard);