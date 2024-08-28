import React, { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Card, CardHeader, Stack } from 'react-bootstrap';
import { AppState, TypeMap } from '../../../../types';
import { CONSTANTS } from '../../../../config/constants';
import {
  getAllPrinters,
  getDepartmentMaintenanceRequests,
  getDepartmentPrinters,
  upDateMaintenanceRequestStatus,
} from '../../../../store/actions';
import ReportIssueComponent from './components/report-issue.component';
import MaintenanceRequestItemComponent from './components/maintenance-request-item.component';

interface State {
  requestsMap: TypeMap<{ editing: boolean; status: string; original: string }>;
}

class MaintenanceComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      requestsMap: {},
    };
  }

  render(): ReactNode {
    const { requests } = this.props.printer;
    const { type } = this.props.user;

    return (
      <Stack data-testid='maintenance-component' gap={1}>
        <Card>
          <CardHeader className='d-flex'>
            <h2 className='me-auto'>Maintenance Requests</h2>
            {type === CONSTANTS.USER && (
              <ReportIssueComponent></ReportIssueComponent>
            )}
          </CardHeader>
        </Card>
        {requests?.map((request) => (
          <MaintenanceRequestItemComponent
            key={request.id}
            request={request}
          ></MaintenanceRequestItemComponent>
        ))}
      </Stack>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  printer: state.printer,
  user: state.auth?.user,
});

const mapDispatchToProps = {
  getDepartmentMaintenanceRequests,
  upDateMaintenanceRequestStatus,
  getDepartmentPrinters,
  getAllPrinters,
};

type Props = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MaintenanceComponent);
