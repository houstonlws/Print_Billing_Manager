import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Card, CardHeader, Stack } from 'react-bootstrap';
import { AppState } from '../../../../types';
import { CONSTANTS } from '../../../../config/constants';
import {
  getAllPrinters,
  getDepartmentMaintenanceRequests,
  getDepartmentPrinters,
  upDateMaintenanceRequestStatus,
} from '../../../../store/actions';
import ReportIssueComponent from './components/report-issue.component';
import MaintenanceRequestItemComponent from './components/maintenance-request-item.component';

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

type Props = {
  selectedDepartment?: string;
} & ReduxProps;

const MaintenanceComponent = (props: Props) => {
  useEffect(() => {
    getMaintenanceRequests();
  }, []);

  const getMaintenanceRequests = async () => {
    const { selectedDepartment, user } = props;
    const department =
      user.type === CONSTANTS.ADMIN
        ? selectedDepartment || ''
        : user.department_id;
    await props.getDepartmentMaintenanceRequests(department);
  };

  const { requests } = props.printer;
  const { type } = props.user;

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
};

export default connector(MaintenanceComponent);
