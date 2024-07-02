import React, { Component, ReactNode } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import withRouter from "../../../utilities/withRouter.utility";
import { ConnectedProps, connect } from 'react-redux'
import { AppState } from "../../../types/app.types";
import { logout } from "../../../store/actions/auth.action";

class SidebarComponent extends Component<SidebarProps, any> {

  logout = () => {
    this.props.logout()
  }

  render(): ReactNode {

    const pathname = this.props.router.location.pathname

    return (
      <Navbar className="h-100">
        <Nav className="flex-column h-100" defaultActiveKey={pathname} variant='pills'>
          <Nav.Item>
            <img src="logo.png" alt="logo" style={{width: '100%', margin: '15px 0px'}}></img>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} eventKey={'/'} to={"/"}>Dashboard</Nav.Link>
            <Nav.Link as={Link} eventKey={'/printers'} to={"/printers"}>Printers</Nav.Link>
            <Nav.Link as={Link} eventKey={'/maintenance'} to={"/maintenance"}>Maintenance</Nav.Link>
            <Nav.Link as={Link} eventKey={'/tracking'} to={"/tracking"}>Tracking</Nav.Link>
            <Nav.Link as={Link} eventKey={'/billing'} to={"/billing"}>Billing</Nav.Link>
          </Nav.Item>
          <Nav.Item className="mt-auto">
            <Nav.Link as={Link} eventKey={'/profile'} to={"/profile"}>Settings</Nav.Link>
            <Nav.Link as={Link} eventKey={'/notifications'} to={"/notifications"}>Notifications</Nav.Link>
            <Nav.Link  onClick={this.logout}>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state:AppState, props:any ) => ({
  router: props.router
})

const mapDispatchToProps = {logout}

const connector = connect(mapStateToProps,mapDispatchToProps)

type SidebarProps = ConnectedProps<typeof connector>

export default withRouter(connector(SidebarComponent));
