import React, { Component, ReactNode } from "react";
import { ConnectedProps, connect } from "react-redux";

class DepartmentBilling extends Component<BillingProps> {
  render(): ReactNode {
    return <></>;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type BillingProps = ConnectedProps<typeof connector>;

export default connector(DepartmentBilling);
