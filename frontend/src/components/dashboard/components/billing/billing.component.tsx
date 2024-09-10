import React, { Component, ReactNode, useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '../../../../types';
import {
  getCurrentInvoice,
  getDepartmentInvoiceHistory,
} from '../../../../store/actions';
import { Card, CardBody, CardHeader, Stack, Table } from 'react-bootstrap';
import { departmentsMap } from '../../../../config/app-data';

interface Props {
  department?: string;
}

const mapStateToProps = (state: AppState) => {
  return {
    billing: state.billing,
  };
};

const mapDispatchToProps = {
  getCurrentInvoice,
  getDepartmentInvoiceHistory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type BillingComponentProps = ConnectedProps<typeof connector> & Props;

const BillingComponent = (props: BillingComponentProps) => {
  const {
    billing: { invoiceHistory },
  } = props;

  useEffect(() => {
    getBillingInfo();
  }, [props.department]);

  const getBillingInfo = async () => {
    const { department } = props;
    if (department) {
      await props.getCurrentInvoice(department);
      await props.getDepartmentInvoiceHistory(department);
    } else {
      await props.getDepartmentInvoiceHistory();
    }
  };

  return (
    <div data-testid='billing-component'>
      <Stack gap={3}>
        <Card>
          <CardHeader>
            <h2>Billing</h2>
          </CardHeader>
        </Card>
        <Card>
          <CardBody>
            <Table>
              <tbody>
                <tr>
                  <th>Department</th>
                  <th>Billing Period</th>
                  <th>B&W Charges</th>
                  <th>Color Charges</th>
                  <th>Paper Charge</th>
                  <th>Status</th>
                </tr>
                {invoiceHistory?.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{departmentsMap[invoice?.department_id]?.name}</td>
                    <td>{invoice?.month + ' ' + invoice?.year}</td>
                    <td>{invoice?.bw_charge}</td>
                    <td>{invoice?.color_charge}</td>
                    <td>{invoice?.paper_charge}</td>
                    <td>{invoice?.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Stack>
    </div>
  );
};
export default connector(BillingComponent);
