import React, { Component, ReactNode } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  FormCheck,
  Stack,
} from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import {
  getDepartmentMetrics,
  getDepartmentPrinters,
} from '../../../../store/actions/printer.actions';
import { AppState } from '../../../../types/app.types';
import MetricDetailsComponent from './components/metric-details.component';

interface State {
  selectedPrinters: { [key: string]: boolean };
}

class TrackingModule extends Component<TrackingProps, State> {
  constructor(props: TrackingProps) {
    super(props);
    const selectedPrinters: { [key: string]: boolean } = {};
    props.printer.printers.forEach((printer) => {
      selectedPrinters[printer.id] = true;
    });
    this.state = {
      selectedPrinters,
    };
  }

  getTotals = () => {
    const { selectedPrinters } = this.state;
    const { metrics } = this.props.printer;

    let totalPrintJobs = 0;
    let totalPrintVolume = 0;
    let totalColor = 0;
    let totalBW = 0;

    metrics.forEach((metric) => {
      if (selectedPrinters[metric.id]) {
        totalPrintJobs += Number(metric.monthly_print_jobs);
        totalPrintVolume += Number(metric.monthly_print_volume);
        totalColor += Number(metric.total_color_pages_last_billing);
        totalBW += Number(metric.total_bw_pages_last_billing);
      }
    });

    return {
      totalPrintJobs,
      totalPrintVolume,
      totalColor,
      totalBW,
    };
  };

  toggleCheckBox = (id: string) => {
    const { selectedPrinters } = this.state;
    selectedPrinters[id] = !selectedPrinters[id];
    this.setState({ selectedPrinters });
  };

  render(): ReactNode {
    const { metrics, printers } = this.props.printer;
    const { selectedPrinters } = this.state;

    const { totalPrintJobs, totalPrintVolume, totalColor, totalBW } =
      this.getTotals();

    const chartData: ChartData<'bar'> = {
      labels: ['Total Pages'],
      datasets: [
        {
          label: 'Total Color Copies',
          data: [totalColor],
          backgroundColor: 'orange',
        },
        {
          label: 'Total B&W Copies',
          data: [totalBW],
          backgroundColor: 'gray',
        },
      ],
    };

    const chartOptions: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return (
      <Stack data-testid='tracking-component' gap={3}>
        <Card>
          <CardHeader>
            <Dropdown autoClose='outside'>
              <div className='d-flex'>
                <h2 className='me-auto'>Track Printers</h2>
                <DropdownToggle>Filter</DropdownToggle>
              </div>
              <DropdownMenu>
                <CardBody>
                  {printers.map((printer) => (
                    <FormCheck
                      key={printer.id}
                      checked={!!selectedPrinters[printer.id]}
                      onChange={() => this.toggleCheckBox(printer.id)}
                    >
                      <FormCheckInput></FormCheckInput>
                      <FormCheckLabel>{printer.serial_number}</FormCheckLabel>
                    </FormCheck>
                  ))}
                </CardBody>
              </DropdownMenu>
            </Dropdown>
          </CardHeader>
        </Card>
        <Card style={{ minHeight: '400px' }}>
          <CardBody>
            <Bar options={chartOptions} data={chartData}></Bar>
          </CardBody>
        </Card>

        <Stack
          direction='horizontal'
          gap={3}
          className='text-center justify-content-between'
        >
          <Card>
            <Card.Header>Total Print Jobs: </Card.Header>
            <Card.Title>
              <h2>{totalPrintJobs}</h2>
              <small>Jobs</small>
            </Card.Title>
          </Card>
          <Card>
            <Card.Header>Total Print Volume: </Card.Header>
            <Card.Title>
              <h2>{totalPrintVolume}</h2>
              <small>Pages</small>
            </Card.Title>
          </Card>
          <Card>
            <Card.Header>Total Color Impressions: </Card.Header>
            <Card.Title>
              <h2 data-testid='total-color'>{totalColor}</h2>
              <small>Clicks</small>
            </Card.Title>
          </Card>
          <Card>
            <Card.Header>Total Black & White Impressions: </Card.Header>
            <Card.Title>
              <h2 data-testid='total-bw'>{totalBW}</h2>
              <small>Clicks</small>
            </Card.Title>
          </Card>
        </Stack>
        <Stack gap={2}>
          <Card>
            <CardHeader>
              <h3>Printer Details</h3>
            </CardHeader>
          </Card>
          {metrics
            .filter((metric) => selectedPrinters[metric.printer_id])
            .map((metric) => (
              <MetricDetailsComponent
                key={metric.id}
                metric={metric}
                printer={printers.find((p) => p.id === metric.id)!}
              ></MetricDetailsComponent>
            ))}
        </Stack>
      </Stack>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    printer: state.printer,
  };
};

const mapDispatchToProps = {
  getDepartmentMetrics,
  getDepartmentPrinters,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type TrackingProps = ConnectedProps<typeof connector>;

export default connector(TrackingModule);
