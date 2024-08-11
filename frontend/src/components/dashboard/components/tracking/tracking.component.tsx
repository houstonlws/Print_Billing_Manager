import React, { Component, ReactNode } from 'react';
import { Stack, Table } from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import {
  getDepartmentMetrics,
  getDepartmentPrinters,
} from '../../../../store/actions/printer.actions';
import { AppState } from '../../../../types/app.types';
import { departmentsMap } from '../../../../config/app-data';
import TotalsBlockComponent from './components/totals-block.component';

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
    const { metrics } = this.props.printer;

    let totalPrintJobs = 0;
    let totalPrintVolume = 0;
    let totalColor = 0;
    let totalBW = 0;

    metrics?.forEach((metric) => {
      totalPrintJobs += Number(metric.monthly_print_jobs);
      totalPrintVolume += Number(metric.monthly_print_volume);
      totalColor += Number(metric.total_color_pages_last_billing);
      totalBW += Number(metric.total_bw_pages_last_billing);
    });

    return {
      totalPrintJobs,
      totalPrintVolume,
      totalColor,
      totalBW,
    };
  };

  render(): ReactNode {
    const {
      user,
      printer: { metrics, printersMap },
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
              <th>Printer</th>
              <th>Location</th>
              <th>Pages</th>
              <th>B&W</th>
              <th>Color</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {metrics?.map((metric) => (
              <tr
                key={metric?.id}
                style={{ whiteSpace: 'nowrap' }}
                data-testid={`printer-${metric.printer_id}`}
              >
                <td>{`${printersMap[metric.printer_id]?.brand || ''} - 
                ${printersMap[metric.printer_id]?.model || ''}`}</td>
                <td>{`${printersMap[metric.printer_id]?.location}`}</td>
                <td>{`${metric.paper_usage_monthly}`}</td>
                <td
                  data-testid={`total-bw-${metric.printer_id}`}
                >{`${metric.total_bw_pages_last_billing}`}</td>
                <td
                  data-testid={`total-color-${metric.printer_id}`}
                >{`${metric.total_color_pages_last_billing}`}</td>
                <td>{`${metric.total_pages_printed}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
