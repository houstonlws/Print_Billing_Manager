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

type Props = {
  selectedDepartment?: string;
} & ReduxProps;

class MaintenanceComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      requestsMap: {},
    };
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (prevProps.printer.requests === this.props.printer.requests) {
      this.getMaintenanceRequests();
    }
  }

  getMaintenanceRequests = async () => {
    const { selectedDepartment, user } = this.props;
    const department =
      user.type === CONSTANTS.ADMIN
        ? selectedDepartment || ''
        : user.department_id;
    await this.props.getDepartmentMaintenanceRequests(department);
  };

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
  user: state.account?.user,
});

const mapDispatchToProps = {
  getDepartmentMaintenanceRequests,
  upDateMaintenanceRequestStatus,
  getDepartmentPrinters,
  getAllPrinters,
};

type ReduxProps = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MaintenanceComponent);
