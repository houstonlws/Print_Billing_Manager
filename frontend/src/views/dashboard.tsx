import React, { Component } from 'react';
import { ConnectedProps, connect } from "react-redux"
import { getUserData } from '../store/actions/user.action'
import { Container } from "react-bootstrap"
import { AppState } from "../models/state.model";

class Dashboard extends Component<DashboardProps> {

    render() { 
        return (
            <Container>
                <h2>Dashboard</h2>
                <p></p>
            </Container>
        )
    }
}

const mapStateToProps = (state:AppState) => {
    return {
        user: state.user.user,
        loggedIn: state.auth.loggedIn
    }
}

const mapDispatchToProps = {
    getUserData
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type DashboardProps = ConnectedProps<typeof connector>

export default connector(Dashboard);