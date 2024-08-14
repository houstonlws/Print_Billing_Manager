import React, { Component, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '../../../../types/app.types';
import { getDepartmentBillingHistory } from '../../../../store/actions/billing.actions';
import { Card, CardBody, CardHeader } from 'react-bootstrap';

interface State {}

interface Props {
  department?: string;
}

class BillingComponent extends Component<BillingComponentProps, State> {
  constructor(props: BillingComponentProps) {
    super(props);
  }

  render(): ReactNode {
    return (
      <>
        <Card>
          <CardHeader>
            <h2>Billing</h2>
          </CardHeader>
        </Card>
        <Card>
          <CardBody>
            <h3>Make Payment</h3>
          </CardBody>
        </Card>
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    printer: state.printer,
    auth: state.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = { getDepartmentBillingHistory };

const connector = connect(mapStateToProps, mapDispatchToProps);

type BillingComponentProps = ConnectedProps<typeof connector> & Props;

export default connector(BillingComponent);
