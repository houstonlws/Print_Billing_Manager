import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Stack, Table } from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import { departmentsMap } from '../../../../config/app-data';
import { CONSTANTS } from '../../../../config/constants';
import {
  getCurrentInvoice,
  getDepartmentInvoiceHistory,
} from '../../../../store/actions';
import { AppState } from '../../../../types';

interface Props {
  department?: string;
}

const mapStateToProps = (state: AppState) => {
  return {
    billing: state.billing,
    account: state.account,
    admin: state.admin,
    tracking: state.tracking,
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
    department,
    billing: { invoiceHistory },
    account: { user },
    admin: { activeProfile },
    tracking: { totals },
  } = props;

  useEffect(() => {
    const getBillingInfo = async () => {
      if (user?.type === CONSTANTS.ADMIN) {
        await props.getCurrentInvoice(department);
        await props.getDepartmentInvoiceHistory(department);
      }
    };
    getBillingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department, user?.type]);

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
            <div className='d-flex'>
              <strong className='me-auto'>Department:</strong>
              {`${department ? departmentsMap[department].name : departmentsMap[user?.department_id]?.name || 'All Departments'}`}
            </div>
            <div className='d-flex'>
              <strong className='me-auto'>Total Color Pages: </strong>
              {`$${activeProfile?.color_price} x ${totals?.totalColor}`}
            </div>
            <div className='d-flex'>
              <strong className='me-auto'>Total B&W Pages: </strong>
              {`$${activeProfile?.bw_price} x ${totals?.totalBw}`}
            </div>
            <div className='d-flex'>
              <strong className='me-auto'>Total Paper: </strong>
              {`$${activeProfile?.paper_price} x ${totals?.totalPaper}`}
            </div>
          </CardBody>
          <CardBody>
            <div className='d-flex'>
              <h4 className='me-auto'>Amount Due</h4>
              <div>{`$${totals?.totalCharge}`}</div>
            </div>
          </CardBody>
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
