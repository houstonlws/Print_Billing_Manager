import React, { Component } from "react";
import { ConnectedProps, connect } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/admin-dashboard";
import UserDashboard from "./components/user-dashboard";
import { AppState } from "../../types/app.types";
import { getUserData } from "../../store/actions/auth.action";
import BillingComponent from "../billing/billing.component";
import notificationsComponent from "../notifications/notifications.component";
import PrintersComponent from "../printers/printers.component";
import ProfileComponent from "../profile/profile.component";
import TrackingComponent from "../tracking/tracking.component";
import styles from "./dashboard.module.css";
import { Container, Row } from "react-bootstrap";
import SidebarComponent from "./components/sidebar.component";
import { getDepartmentMetrics, getDepartmentPrinters } from "../../store/actions/printer.actions";
import MaintenanceComponent from "../maintenance/maintenance.component";

class DashboardComponent extends Component<DashboardProps> {
  componentDidMount(): void {
    this.props.getUserData();
    this.props.getDepartmentPrinters();
    const printerIds = this.props.printer.printers.map((v) => v.id);
    this.props.getDepartmentMetrics(printerIds);
  }

  render() {

    const { user } = this.props.auth
    
    return (
      <Container fluid>
        <Row>
          <div className={styles.sidebar}>
            <SidebarComponent></SidebarComponent>
          </div>
          <div className={styles.mainContent}>
              <Routes>
                <Route
                  path="/*"
                  element={user?.type === "ADMIN" ? <AdminDashboard /> : <UserDashboard auth={this.props.auth} printer={this.props.printer}/>}
                ></Route>
                <Route path="billing" element={<BillingComponent/>}></Route>
                <Route path="printers" element={<PrintersComponent/>}></Route>
                <Route path="maintenance" element={<MaintenanceComponent/>}></Route>
                <Route path="tracking" element={<TrackingComponent/>}></Route>
                <Route path="profile" element={<ProfileComponent/>}></Route>
                <Route
                  path="notifications"
                  Component={notificationsComponent}
                ></Route>
              </Routes>
          </div>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    auth: state.auth,
    data: state.data,
    printer: state.printer,
    billing: state.billing,
    maintenance: state.maintenance,
  };
};

const mapDispatchToProps = {
  getUserData,
  getDepartmentPrinters,
  getDepartmentMetrics
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type DashboardProps = ConnectedProps<typeof connector>;

export default connector(DashboardComponent);
