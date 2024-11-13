import React, { useEffect } from 'react';
import { Card, CardHeader, Stack } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { CONSTANTS } from '../../../../config/constants';
import {
  getAllPrinters,
  getDepartmentMaintenanceRequests,
  getDepartmentPrinters,
  upDateMaintenanceRequestStatus,
} from '../../../../store/actions';
import { AppState } from '../../../../types';
import MaintenanceRequestItemComponent from './components/maintenance-request-item.component';
import ReportIssueComponent from './components/report-issue.component';

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
    const getMaintenanceRequests = async () => {
      const { selectedDepartment, user } = props;
      const department =
        user.type === CONSTANTS.ADMIN
          ? selectedDepartment || ''
          : user.department_id;
      await props.getDepartmentMaintenanceRequests(department);
    };
    getMaintenanceRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
