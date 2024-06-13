import React, { Component, ReactNode } from "react";
import { Container } from "react-bootstrap";
import { UserProfile } from "./components";
import { AppState } from "../../../../App";
import { ConnectedProps, connect } from "react-redux";
import { getDepartments, getUserData } from "./utilities/profile.action";

class ProfileModule extends Component<DashboardProps> {

    componentDidMount(): void {
        this.props.getDepartments()
    }


    render(): ReactNode {
        return (
            <Container>
               <UserProfile></UserProfile>
            </Container>
        )
    }

}
const mapStateToProps = (state: AppState) => {
    return {
        user: state.dashboard.profile?.user
    }
}

const mapDispatchToProps = {
    getUserData,
    getDepartments
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type DashboardProps = ConnectedProps<typeof connector>

export default connector(ProfileModule)