import React, { Component, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Form,
  FormSelect,
  ListGroup,
  ListGroupItem,
  Stack,
} from 'react-bootstrap';
import { AppState } from '../../../../types/app.types';
import { CONSTANTS } from '../../../../config/constants';
import { getDepartmentBillingHistory } from '../../../../store/actions/billing.actions';
import { departmentsList } from '../../../../config/app-data';
import { Bill } from '../../../../types/billing.types';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface State {
  selectedDepartment: string;
}

class BillingComponent extends Component<BillingComponentProps, State> {
  constructor(props: BillingComponentProps) {
    super(props);
    const depId = props.user?.department_id;
    let initialDepartment = '';
    if (depId) {
      this.props.getDepartmentBillingHistory(depId);
      initialDepartment =
        departmentsList.find((d) => d.id === Number(depId))?.name || '';
    }
    this.state = {
      selectedDepartment: initialDepartment,
    };
  }

  onChange = (event: any) => {
    this.setState({ selectedDepartment: event.target.value });
    const depId = departmentsList.find(
      (d) => d.name === event.target.value
    )?.id!;
    this.props.getDepartmentBillingHistory(depId);
  };

  currentBill = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];
    return this.props.billData?.find(
      (b) => b.billing_cycle_start === start && b.billing_cycle_end === end
    );
  };

  render(): ReactNode {
    const { billData, user } = this.props;
    const { selectedDepartment } = this.state;
    const currentBill = this.currentBill();

    return (
      <Stack gap={2} data-testid='billing-component'>
        <Card>
          <CardHeader>
            <h2>Current Bill</h2>
          </CardHeader>
        </Card>
        <Card>
          <CardBody className='d-flex'>
            <CardTitle className='me-auto'>
              <strong>Department:</strong> {selectedDepartment}
            </CardTitle>
            <CardTitle>
              <strong>Billing Period: </strong>
              <span data-testid='current-start'>
                {currentBill?.billing_cycle_start}
              </span>{' '}
              {' - '}
              <span data-testid='current-end'>
                {currentBill?.billing_cycle_end}
              </span>
            </CardTitle>
          </CardBody>
          <ListGroup>
            <ListGroupItem>
              <div>
                <strong>Total Color Pages: </strong>
                {currentBill?.total_color_pages}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div>
                <strong>Total B&W Pages: </strong>
                {currentBill?.total_bw_pages}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <CardText>
                <strong>Total Paper: </strong>
                {currentBill?.total_paper}
              </CardText>
            </ListGroupItem>
          </ListGroup>
          <CardBody>
            <h4>Amount Due</h4>
            <div style={{ fontSize: '4em', lineHeight: '1em', color: 'green' }}>
              ${currentBill?.total_charges}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2>Billing History</h2>
          </CardHeader>
        </Card>
        <Accordion>
          {billData?.map((bill: Bill, index) => (
            <AccordionItem
              key={index}
              eventKey={bill.id}
              data-testid={`previous-${bill.id}`}
              style={{ marginTop: '5px' }}
            >
              <AccordionHeader className='d-flex justify-content-between'>
                <Stack direction='horizontal' gap={3}>
                  <div>
                    <strong>Bill Start:</strong> {bill.billing_cycle_start}
                  </div>
                  <div>
                    <strong>Bill End:</strong> {bill.billing_cycle_end}
                  </div>
                </Stack>
              </AccordionHeader>
              <AccordionBody
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #c8c8c8',
                }}
              >
                <div>
                  <div>
                    <strong>Total Charges:</strong> {bill?.total_charges}
                  </div>
                  <div>
                    <strong>Total BW Charges:</strong>{' '}
                    {bill?.color_pages_charge}
                  </div>
                  <div>
                    <strong>Total Color Charges:</strong>
                    {bill?.color_pages_charge}
                  </div>
                </div>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    billData: state.billing.billData,
    user: state.auth.user,
  };
};

const mapDispatchToProps = { getDepartmentBillingHistory };

const connector = connect(mapStateToProps, mapDispatchToProps);

type BillingComponentProps = ConnectedProps<typeof connector>;

export default connector(BillingComponent);
