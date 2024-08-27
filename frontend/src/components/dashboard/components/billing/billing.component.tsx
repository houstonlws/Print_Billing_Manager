import React, { Component, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '../../../../types';
import {
  getCurrentInvoice,
  getDepartmentBillingHistory,
  getDepartmentInvoiceHistory,
} from '../../../../store/actions';
import { Card, CardBody, CardHeader, Table } from 'react-bootstrap';
import { departmentsMap } from '../../../../config/app-data';

interface State {}

interface Props {
  department?: string;
}

class BillingComponent extends Component<BillingComponentProps, State> {
  async componentDidMount() {
    this.getBillingInfo();
  }

  componentDidUpdate(
    prevProps: Readonly<BillingComponentProps>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (prevProps.department !== this.props.department) {
      this.getBillingInfo();
    }
  }

  getBillingInfo = () => {
    const { department } = this.props;
    if (department) {
      this.props.getCurrentInvoice(department);
      this.props.getDepartmentInvoiceHistory(department);
    } else {
      this.props.getDepartmentInvoiceHistory();
    }
  };

  render(): ReactNode {
    const {
      billing: { currentInvoice, invoiceHistory },
    } = this.props;
    return (
      <div data-testid='billing-component'>
        <h2>Billing</h2>

        <h3>Billing History</h3>
        <Card>
          <CardBody>
            <Table>
              <tr>
                <th>Department</th>
                <th>Billing Period</th>
                <th>B&W Charges</th>
                <th>Color Charges</th>
                <th>Paper Charge</th>
                <th>Status</th>
              </tr>
              {invoiceHistory?.map((invoice) => (
                <tr>
                  <td>{departmentsMap[invoice?.department_id]?.name}</td>
                  <td>{invoice?.month + ' ' + invoice?.year}</td>
                  <td>{invoice?.bw_charge}</td>
                  <td>{invoice?.color_charge}</td>
                  <td>{invoice?.paper_charge}</td>
                  <td>{invoice?.status}</td>
                </tr>
              ))}
            </Table>
          </CardBody>
        </Card>

        <h3>Make Payment</h3>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    billing: state.billing,
  };
};

const mapDispatchToProps = {
  getDepartmentBillingHistory,
  getCurrentInvoice,
  getDepartmentInvoiceHistory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type BillingComponentProps = ConnectedProps<typeof connector> & Props;

export default connector(BillingComponent);
