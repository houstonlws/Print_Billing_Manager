import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { connect, ConnectedProps } from 'react-redux';
import { AppState, TypeMap } from '../../../../../types';

const mstp = (state: AppState) => ({
  tracking: state.tracking,
});

const mdtp = {};
const connector = connect(mstp, mdtp);
type ReduxProps = ConnectedProps<typeof connector>;
interface Props extends ReduxProps {}

const Graph = (props: Props) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [],
      },
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: [],
    },
  });

  const [series, setSeries] = useState<ApexAxisChartSeries>([]);

  useEffect(() => {
    const populateChartBillingPeriod = () => {
      const {
        tracking: { currentJobs },
      } = props;

      const firstJob = currentJobs?.length > 0 ? currentJobs[0].date : '';

      const now = new Date(firstJob);
      const dates = Array.from(
        {
          length: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate(),
        },
        (_, i) => new Date(now.getFullYear(), now.getMonth(), i + 1).getTime()
      );

      const initialData: TypeMap<number> = {};
      const [bwData, colorData, paperData] = [
        { ...initialData },
        { ...initialData },
        { ...initialData },
      ];

      currentJobs?.forEach(
        ({ date, black_and_white_pages, color_pages, pages }) => {
          const jobDate = new Date(
            new Date(date.replace(/-/g, '/')).setHours(0, 0, 0, 0)
          ).getTime();
          bwData[jobDate] =
            (bwData[jobDate] || 0) + Number(black_and_white_pages) || 0;
          colorData[jobDate] =
            (colorData[jobDate] || 0) + Number(color_pages) || 0;
          paperData[jobDate] = (paperData[jobDate] || 0) + Number(pages) || 0;
        }
      );

      const createSeriesData = (dataMap: TypeMap<number>) =>
        dates.map((date) => ({ x: date, y: dataMap[date] || 0 }));
      const newSeries = [
        { name: 'Paper Usage', data: createSeriesData(paperData) },
        { name: 'Color Copies', data: createSeriesData(colorData) },
        { name: 'B&W Copies', data: createSeriesData(bwData) },
      ];

      setOptions({ xaxis: { categories: dates } });
      setSeries(newSeries);
    };
    populateChartBillingPeriod();
  }, [props, props.tracking.currentJobs]);

  return (
    <ReactApexChart
      type='area'
      height={'350px'}
      options={options}
      series={series}
    ></ReactApexChart>
  );
};

export default connector(Graph);
