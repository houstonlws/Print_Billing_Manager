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
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Stack,
} from 'react-bootstrap';
import { AppState } from '../../types/app.types';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

class BillingComponent extends Component<BillingComponentProps> {
  render(): ReactNode {
    const { billData, departments } = this.props;

    let dueDate = '';

    if (billData) {
      const dd: Date = new Date(billData.billing_cycle_end);
      dd.setMonth(dd.getMonth() + 1);
      dueDate = dd.toISOString().split('T').shift() || '';
    }

    return (
      <Stack gap={2}>
        <Card>
          <CardHeader>
            <h2>Billing</h2>
          </CardHeader>
        </Card>
        <Card>
          <CardBody>
            <div className="d-flex">
              <CardTitle className="me-auto">
                <strong>From:</strong> Billing Department
              </CardTitle>
              <CardTitle>
                <strong>Billing Period: </strong>
                {billData?.billing_cycle_start} - {billData?.billing_cycle_end}
              </CardTitle>
            </div>
            <div className="d-flex">
              <CardTitle className="me-auto">
                <strong>To:</strong>{' '}
                {
                  departments.find((d) => d.id === billData?.department_id)
                    ?.name
                }
              </CardTitle>
              <CardTitle>
                <strong>Due Date: </strong>
                {dueDate}
              </CardTitle>
            </div>
          </CardBody>
          <ListGroup>
            <ListGroupItem>
              <div>
                <strong>Total Color Pages: </strong>
                {billData?.total_color_pages}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div>
                <strong>Total B&W Pages: </strong>
                {billData?.total_bw_pages}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <CardText>
                <strong>Total Paper: </strong>
                {billData?.total_paper}
              </CardText>
            </ListGroupItem>
          </ListGroup>
          <CardBody>
            <h4>Amount Due</h4>
            <div style={{ fontSize: '4em', lineHeight: '1em', color: 'green' }}>
              ${billData?.total_charges}
            </div>
          </CardBody>
        </Card>
      </Stack>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    departments: state.data.departments,
    billData: state.billing.billData,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type BillingComponentProps = ConnectedProps<typeof connector>;

export default connector(BillingComponent);
