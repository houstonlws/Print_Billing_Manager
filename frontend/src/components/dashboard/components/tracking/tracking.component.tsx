import React, { Component, ReactNode } from 'react';
import { Card, CardBody, CardHeader, Stack, Table } from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import {
  getDepartmentMetrics,
  getDepartmentPrinters,
  getPriceProfile,
} from '../../../../store/actions';
import { departmentsMap } from '../../../../config/app-data';
import TotalsBlockComponent from './components/totals-block.component';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Job, AppState, TypeMap } from '../../../../types';

interface State {
  series: ApexAxisChartSeries;
  options: ApexOptions;
}

interface Props {
  selectedDepartment?: string;
}

class TrackingModule extends Component<TrackingProps, State> {
  constructor(props: TrackingProps) {
    super(props);
    this.state = {
      series: [],
      options: {
        chart: {
          stacked: false,
          height: 100,
          type: 'area',
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [],
          labels: {
            rotate: -45,
          },
        },
      },
    };
  }

  async componentDidMount() {
    this.populateChartBillingPeriod();
    await this.props.getPriceProfile();
  }
  componentDidUpdate(
    prevProps: Readonly<TrackingProps>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (prevState.series === this.state.series) {
      this.populateChartBillingPeriod();
    }
  }

  populateChartBillingPeriod = () => {
    const {
      tracking: { currentJobs },
    } = this.props;
    let dates: number[] = [];
    let now = new Date();
    let date = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
    while (date.getMonth() == now.getMonth()) {
      dates.push(date.getTime());
      date.setDate(date.getDate() + 1);
    }
    let bwData: TypeMap<number> = {};
    let colorData: TypeMap<number> = {};
    let paperData: TypeMap<number> = {};
    if (currentJobs?.length > 0) {
      currentJobs?.forEach((job: Job) => {
        const raw = new Date(job?.date);
        const jobDate = new Date(
          raw.getFullYear(),
          raw.getMonth(),
          raw.getDate() + 1
        ).setHours(0, 0, 0, 0);
        if (!bwData[jobDate]) bwData[jobDate] = 0;
        if (!colorData[jobDate]) colorData[jobDate] = 0;
        if (!paperData[jobDate]) paperData[jobDate] = 0;
        bwData[jobDate] =
          bwData[jobDate] + Number(job.black_and_white_pages) || 0;
        colorData[jobDate] = colorData[jobDate] + Number(job.color_pages) || 0;
        paperData[jobDate] = paperData[jobDate] + Number(job.pages) || 0;
      });
    }

    let bwArr: { x: number; y: number }[] = [];
    let colorArr: { x: number; y: number }[] = [];
    let paperArr: { x: number; y: number }[] = [];

    dates?.forEach((date) => {
      if (!bwData[date]) {
        bwArr.push({ x: date, y: 0 });
      } else {
        bwArr.push({ x: date, y: bwData[date] });
      }
      if (!colorData[date]) {
        colorArr.push({ x: date, y: 0 });
      } else {
        colorArr.push({ x: date, y: colorData[date] });
      }
      if (!paperData[date]) {
        paperArr.push({ x: date, y: 0 });
      } else {
        paperArr.push({ x: date, y: paperData[date] });
      }
    });

    const series = [
      { name: 'B&W Copies', data: bwArr },
      { name: 'Color Copies', data: colorArr },
      { name: 'Paper Usage', data: paperArr },
    ];

    this.setState({
      options: { xaxis: { categories: dates } },
      series: series,
    });
  };

  populateChartJobHistory = () => {
    const {
      tracking: { jobHistory },
    } = this.props;
    let dates: string[] = [];
    let bwData: number[] = [];
    let colorData: number[] = [];
    let paperData: number[] = [];
    Object.entries(jobHistory)?.forEach((year) => {
      Object.entries(year[1])?.forEach((month) => {
        let b = 0;
        let c = 0;
        let p = 0;
        dates.push(`${year[0]}-${month[0]}`);
        month[1]?.forEach((job) => {
          b += Number(job.black_and_white_pages);
          c += Number(job?.color_pages);
          p += Number(job?.pages);
        });
        bwData.push(b);
        colorData.push(c);
        paperData.push(p);
      });
    });

    const series = [
      { name: 'B&W Copies', data: bwData },
      { name: 'Color Copies', data: colorData },
      { name: 'Paper Usage', data: paperData },
    ];

    this.setState({
      options: { xaxis: { categories: dates } },
      series: series,
    });
  };

  getCurrentBillingPeriod = () => {
    return new Date().toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  };

  render(): ReactNode {
    const {
      user,
      printer: { printersMap },
      tracking: { currentJobs, totals },
      selectedDepartment,
      admin: { activeProfile },
    } = this.props;

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
            <h3>{`${
              selectedDepartment
                ? departmentsMap[selectedDepartment].name
                : departmentsMap[user.department_id]?.name || 'All Departments'
            }`}</h3>
            <h3>Current Period:</h3>
            {this.getCurrentBillingPeriod()}
          </CardBody>
        </Card>

        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
        ></ReactApexChart>

        <Card>
          <CardBody>
            <div className='d-flex'>
              <strong className='me-auto'>Department:</strong>
              {`${selectedDepartment ? departmentsMap[selectedDepartment].name : departmentsMap[user.department_id]?.name || 'All Departments'}`}
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

        <Stack direction='horizontal' gap={3}>
          <TotalsBlockComponent
            data-test-id={`total-color-${totals?.totalColor}`}
            value={`${totals?.totalColor}`}
            title='Color'
            unit='Clicks'
          ></TotalsBlockComponent>
          <TotalsBlockComponent
            data-test-id={`total-color-${totals?.totalBw}`}
            value={`${totals?.totalBw}`}
            title='Black & White'
            unit='Clicks'
          ></TotalsBlockComponent>
        </Stack>
        <Stack direction='horizontal' gap={3}>
          <TotalsBlockComponent
            value={`${totals?.totalJobs}`}
            title='Print Jobs'
            unit='Jobs'
          ></TotalsBlockComponent>
          <TotalsBlockComponent
            value={`${totals?.totalPaper}`}
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
            {currentJobs?.length > 0 ? (
              currentJobs?.map((job: Job, index) => {
                const printer_id = job?.printer_id;
                return (
                  <tr key={index}>
                    <td>{job?.date}</td>
                    <td>{`${printersMap[printer_id]?.brand} - 
                ${printersMap[printer_id]?.model}`}</td>
                    <td>{`${printersMap[printer_id]?.location}`}</td>
                    <td>{`${job?.pages}`}</td>
                    <td>{`${job?.black_and_white_pages}`}</td>
                    <td>{`${job?.color_pages}`}</td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      </Stack>
    );
  }
}

const mapStateToProps = (state: AppState, props: any) => {
  return {
    printer: state.printer,
    user: state.auth.user,
    admin: state.admin,
    tracking: state.tracking,
  };
};

const mapDispatchToProps = {
  getDepartmentMetrics,
  getDepartmentPrinters,
  getPriceProfile,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type TrackingProps = ConnectedProps<typeof connector> & Props;

export default connector(TrackingModule);
