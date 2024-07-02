import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import billingComponent from "../../billing/billing.component";
import notificationsComponent from "../../notifications/notifications.component";
import printersComponent from "../../printers/printers.component";
import profileComponent from "../../profile/profile.component";
import trackingComponent from "../../tracking/tracking.component";
import { Container } from "react-bootstrap";

class AdminDashboard extends Component {

    render(): React.ReactNode {
        return (
            <>
                <h2>Admin Dashboard</h2>
            </>
        )
    }
}

export default AdminDashboard