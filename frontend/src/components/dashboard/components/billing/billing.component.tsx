import React, { Component, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
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
  ListGroup,
  ListGroupItem,
  Stack,
  Table,
} from 'react-bootstrap';
import { AppState } from '../../../../types/app.types';
import { getDepartmentBillingHistory } from '../../../../store/actions/billing.actions';
import { departmentsList, departmentsMap } from '../../../../config/app-data';
import { Bill } from '../../../../types/billing.types';
import { Job } from '../../../../types/printer.types';

interface State {}

interface Props {
  department?: string;
}

class BillingComponent extends Component<BillingComponentProps, State> {
  constructor(props: BillingComponentProps) {
    super(props);
  }

  getTotals = (year?: string, month?: string) => {
    const {
      printer: { jobs, jobHistory },
      admin: { activeProfile },
    } = this.props;
    let totals = {
      totalColor: 0,
      totalBw: 0,
      totalPaper: 0,
      bwCharge: 0,
      colorCharge: 0,
      paperCharge: 0,
      totalCharge: 0,
    };
    if (jobHistory && month && year) {
      const prevJobs = jobHistory[year][month];
      prevJobs?.forEach((job) => {
        totals.totalBw += Number(job?.black_and_white_pages);
        totals.totalColor += Number(job?.color_pages);
        totals.totalPaper += Number(job?.pages);
      });
    } else {
      if (jobs)
        for (const job of jobs) {
          totals.totalBw += Number(job?.black_and_white_pages);
          totals.totalColor += Number(job?.color_pages);
          totals.totalPaper += Number(job?.pages);
        }
    }
    totals.bwCharge = totals.totalBw * Number(activeProfile.bw_price);
    totals.colorCharge = totals.totalColor * Number(activeProfile.color_price);
    totals.paperCharge = totals.totalPaper * Number(activeProfile.paper_price);
    totals.totalCharge =
      totals.bwCharge + totals.colorCharge + totals.paperCharge;
    return totals;
  };

  currentDate = () => {
    const now = new Date();
    const m = now.getMonth();
    const year = now.getFullYear();
    const firstDOM = new Date(year, m, 1).toISOString().split('T')[0];
    const lastDOM = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .split('T')[0];
    const billPeriod = now.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    return {
      now: now,
      billPeriod: billPeriod,
      year: year,
      firstDOM: firstDOM,
      lastDOM: lastDOM,
    };
  };

  render(): ReactNode {
    const {
      department,
      printer: { jobs, jobHistory },
      admin: { activeProfile },
    } = this.props;
    const totals = this.getTotals();

    return (
      <Stack gap={2} data-testid='billing-component'>
        <Card>
          <CardHeader>
            <h2>Billing</h2>
          </CardHeader>
        </Card>
        <Card>
          <CardBody>
            <h3>Current Period:</h3>
            {this.currentDate().billPeriod}
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className='d-flex'>
              <strong className='me-auto'>Department:</strong>
              {`${department ? departmentsMap[department]?.name : 'All Departments'}`}
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
              <div>{`$${totals.totalCharge}`}</div>
            </div>
          </CardBody>
        </Card>

        <h3>Billing History</h3>
        {Object.entries(jobHistory)
          ?.reverse()
          .map((year, index) => [
            <h3 key={`${year[0]}=${index}`}>{year[0]}</h3>,
            <Accordion key={year[0] + '-1'}>
              {Object.entries(year[1])
                ?.reverse()
                .map((month) => (
                  <AccordionItem
                    key={`${month[0]}-${index}`}
                    eventKey={month[0]}
                    data-testid={`previous-${month[0]}`}
                    style={{ marginTop: '5px' }}
                  >
                    <AccordionHeader className='d-flex'>
                      <div className='me-auto'>
                        {new Date(0, Number(month[0]) - 1).toLocaleString(
                          'en-us',
                          { month: 'long' }
                        )}
                      </div>
                      <div>{`Total Charge: $${this.getTotals(year[0], month[0]).totalCharge}`}</div>
                    </AccordionHeader>
                    <AccordionBody>
                      <Table>
                        <tbody>
                          <tr>
                            <th>Date</th>
                            <th>Department</th>
                            <th>B&W Pages</th>
                            <th>Color Pages</th>
                            <th>Total Paper</th>
                          </tr>
                          {month[1]?.map((job) => (
                            <tr key={`${year[0]}-${month[0]}-${job?.id}`}>
                              <td>{job?.date}</td>
                              <td>{`${departmentsMap[job?.department_id]?.name}`}</td>
                              <td>{job?.black_and_white_pages}</td>
                              <td>{job?.color_pages}</td>
                              <td>{job?.pages}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </AccordionBody>
                  </AccordionItem>
                ))}
            </Accordion>,
          ])}
      </Stack>
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
