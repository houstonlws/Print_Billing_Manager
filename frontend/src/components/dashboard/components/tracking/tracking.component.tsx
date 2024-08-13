import React, { Component, ReactNode } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Table,
} from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import {
  getDepartmentMetrics,
  getDepartmentPrinters,
} from '../../../../store/actions/printer.actions';
import { AppState } from '../../../../types/app.types';
import { departmentsMap } from '../../../../config/app-data';
import TotalsBlockComponent from './components/totals-block.component';
import { Job } from '../../../../types/printer.types';

interface State {}
interface Props {
  selectedDepartment?: string;
}

class TrackingModule extends Component<TrackingProps, State> {
  constructor(props: TrackingProps) {
    super(props);
    this.state = {};
    this.getTotals();
  }

  getTotals = () => {
    const { metrics, jobs } = this.props.printer;

    let totalPrintJobs = 0;
    let totalPrintVolume = 0;
    let totalColor = 0;
    let totalBW = 0;

    jobs?.forEach((job) => {
      totalPrintJobs++;
      totalPrintVolume += Number(job?.pages);
      totalColor += Number(job?.color_pages);
      totalBW += Number(job?.black_and_white_pages);
    });

    return {
      totalPrintJobs,
      totalPrintVolume,
      totalColor,
      totalBW,
    };
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
      user,
      printer: { printersMap, jobs, jobHistory },
      selectedDepartment,
    } = this.props;

    const { totalPrintJobs, totalPrintVolume, totalColor, totalBW } =
      this.getTotals();

    return (
      <Stack data-testid='tracking-component' gap={3}>
        <style>
          {`.totals-block {
              width: 100%;
          }`}
        </style>
        <Card>
          <CardHeader>
            <h2>Tracking</h2>
          </CardHeader>
        </Card>
        <Card>
          <CardBody>
            <h3>Current Period:</h3>
            {this.currentDate().billPeriod}
          </CardBody>
        </Card>
        <h3>{`${selectedDepartment ? departmentsMap[selectedDepartment].name : departmentsMap[user.department_id]?.name || 'All Departments'}`}</h3>
        <Stack direction='horizontal' gap={3}>
          <TotalsBlockComponent
            data-test-id={`total-color-${totalColor}`}
            value={`${totalColor}`}
            title='Color'
            unit='Clicks'
          ></TotalsBlockComponent>
          <TotalsBlockComponent
            data-test-id={`total-color-${totalBW}`}
            value={`${totalBW}`}
            title='Black & White'
            unit='Clicks'
          ></TotalsBlockComponent>
        </Stack>
        <Stack direction='horizontal' gap={3}>
          <TotalsBlockComponent
            value={`${totalPrintJobs}`}
            title='Print Jobs'
            unit='Jobs'
          ></TotalsBlockComponent>
          <TotalsBlockComponent
            value={`${totalPrintVolume}`}
            title='Print Volume'
            unit='Pages'
          ></TotalsBlockComponent>
        </Stack>
        <Table className='mt-3'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Printer</th>
              <th>Location</th>
              <th>Pages</th>
              <th>B&W</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job: Job, index) => {
              const printer_id = job?.printer_id;
              return (
                <tr key={index}>
                  <td>{job?.date}</td>
                  <td>{`${printersMap[printer_id]?.brand || ''} - 
                ${printersMap[printer_id]?.model || ''}`}</td>
                  <td>{`${printersMap[printer_id]?.location}`}</td>
                  <td>{`${job?.pages}`}</td>
                  <td>{`${job?.black_and_white_pages}`}</td>
                  <td>{`${job?.color_pages}`}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <h3>Job History</h3>
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
                    <AccordionHeader className='d-flex justify-content-between'>
                      <div>
                        {new Date(0, Number(month[0]) - 1).toLocaleString(
                          'en-us',
                          { month: 'long' }
                        )}
                      </div>
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
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  getDepartmentMetrics,
  getDepartmentPrinters,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type TrackingProps = ConnectedProps<typeof connector> & Props;

export default connector(TrackingModule);
