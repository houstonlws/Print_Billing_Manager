import React, { Component } from 'react';
import { ConnectedProps, connect } from "react-redux"
import { Route, Routes } from 'react-router-dom';
import { AdminDashboard, UserDashboard } from './components';
import { Container } from 'react-bootstrap';
import BillingModule from './modules/billing/billing.module';
import PrintersModule from './modules/printers/printers.module';
import MaintenanceModule from './modules/maintenance/maintenance.module';
import TrackingModule from './modules/tracking/tracking.module';
import ProfileModule from './modules/profile/profile.module';
import NotificationsModule from './modules/notifications/notifications.module';
import NavigationModule from './modules/navigation/navigation.module';
import { getUserData } from './modules/profile/utilities/profile.action';
import { AppState } from '../../App';

class DashboardModule extends Component<DashboardProps> {

    componentDidMount(): void {
        this.props.getUserData();
    }

    render() { 

        const type = this.props.user?.type || ''

        return (
            <>
                <NavigationModule></NavigationModule>
                <Container>
                    <Routes>
                        <Route path='/' Component={type === 'ADMIN' ? AdminDashboard : UserDashboard}></Route>
                        <Route path='/billing' Component={BillingModule}></Route>
                        <Route path="/printers"  Component={PrintersModule}>
                            <Route path='/printers/maintenance' Component={MaintenanceModule}></Route>
                        </Route>
                        <Route path='/tracking' Component={TrackingModule}></Route>
                        <Route path='/profile' Component={ProfileModule}></Route>
                        <Route path='/notifications' Component={NotificationsModule}></Route>
                    </Routes>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        user: state.dashboard.profile?.user,
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = {
    getUserData
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type DashboardProps = ConnectedProps<typeof connector>

export default connector(DashboardModule)
