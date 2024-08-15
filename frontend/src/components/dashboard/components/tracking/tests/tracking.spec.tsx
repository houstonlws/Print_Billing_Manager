import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TrackingComponent from '../tracking.component';
import { metrics, printers, printersMap } from '../../../shared/test.data';

const mockStore = configureStore([thunk]);
let store = mockStore({
  printer: {
    printers: printers,
    metrics: metrics,
    printersMap: printersMap,
  },
  auth: {
    user: {
      department_id: 1,
    },
  },
  tracking: {
    jobHistory: [],
    currentJobs: [],
  },
  admin: {
    activeProfile: {},
  },
});

// describe('Tracking Component Tests', () => {
//   beforeEach(() => {});

// it('should render the component', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <TrackingComponent></TrackingComponent>
//     </Provider>
//   );
//   expect(getByTestId('tracking-component')).toBeInTheDocument();
// });

// it('should list the total black and white pages printed', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <TrackingComponent></TrackingComponent>
//     </Provider>
//   );
//   expect(getByTestId('Black & White-350')).toBeInTheDocument();
// });

// it('should list the total color pages printed', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <TrackingComponent></TrackingComponent>
//     </Provider>
//   );
//   expect(getByTestId('Color-790')).toBeInTheDocument();
// });

// it('should list metrics for each printer', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <TrackingComponent></TrackingComponent>
//     </Provider>
//   );
//   printers.forEach((p) => {
//     expect(getByTestId(`printer-${p.id}`)).toBeInTheDocument();
//   });
// });

// it('should list the black and white pages printed by each printer', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <TrackingComponent></TrackingComponent>
//     </Provider>
//   );
//   let values: { [key: string]: number } = {};
//   for (const metric of metrics) {
//     values[metric.printer_id] = metric.total_bw_pages_last_billing;
//   }
//   metrics.forEach((p) => {
//     expect(getByTestId(`printer-${p.printer_id}`)).toBeInTheDocument();
//     expect(getByTestId(`total-bw-${p.printer_id}`).innerHTML).toEqual(
//       `${values[p.printer_id]}`
//     );
//   });
// });

// it('should list the color pages printed by each printer', () => {
//   const { getByTestId } = render(
//     <Provider store={store}>
//       <TrackingComponent></TrackingComponent>
//     </Provider>
//   );
//   let values: { [key: string]: number } = {};
//   for (const metric of metrics) {
//     values[metric.printer_id] = metric.total_color_pages_last_billing;
//   }
//   metrics.forEach((p) => {
//     expect(getByTestId(`printer-${p.printer_id}`)).toBeInTheDocument();
//     expect(getByTestId(`total-color-${p.printer_id}`).innerHTML).toEqual(
//       `${values[p.printer_id]}`
//     );
//   });
// });
// });
