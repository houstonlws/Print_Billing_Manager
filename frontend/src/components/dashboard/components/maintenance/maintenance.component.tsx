import React, { Component, ReactNode } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormSelect,
  Stack,
} from 'react-bootstrap';
import { AppState, TypeMap } from '../../../../types';
import { CONSTANTS } from '../../../../config/constants';
import { departmentsMap, STATUS } from '../../../../config/app-data';
import {
  getAllPrinters,
  getDepartmentMaintenanceRequests,
  getDepartmentPrinters,
  upDateMaintenanceRequestStatus,
} from '../../../../store/actions';
import ReportIssueComponent from './components/report-issue.component';

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

  async componentDidMount(): Promise<void> {
    let { requestsMap } = this.state;
    const { requests } = this.props.printer;

    if (requests)
      for (const request of requests) {
        requestsMap[request.id] = {
          editing: false,
          status: request.status,
          original: request.status,
        };
      }
    this.setState({ requestsMap: requestsMap });
  }

  onChange = async (event: any) => {
    let { requestsMap } = this.state;
    requestsMap[event.target.id].status = event.target.value;
    this.setState({ requestsMap: requestsMap });
  };

  toggleEditing = (event: any) => {
    const id = event.target.id;
    let { requestsMap } = this.state;
    requestsMap[id] = {
      ...requestsMap[id],
      editing: !requestsMap[id]?.editing,
    };
    this.setState({
      requestsMap: requestsMap,
    });
  };

  changeStatus = async (event: any) => {
    const { requestsMap } = this.state;
    const { status, original } = requestsMap[event.target.id];
    if (original !== status) {
      await this.props.upDateMaintenanceRequestStatus(event.target.id, status);
    }
    this.toggleEditing(event);
  };

  render(): ReactNode {
    const { requests, printersMap } = this.props.printer;
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
        {requests?.map((request) => {
          const { requestsMap } = this.state;
          const editing = requestsMap[request.id]?.editing;
          return (
            <Card
              data-testid={`maintenance-item-${request.id}`}
              key={request.id}
              className='mt-2'
            >
              <CardHeader className='d-flex align-items-center'>
                <div className='me-auto'>
                  <Badge
                    bg={request.status === 'Resolved' ? 'success' : 'warning'}
                  >
                    {request.status}
                  </Badge>
                  <span className='mx-3'>
                    <strong>Date Issued:</strong> {request.request_date}
                  </span>
                  <span>
                    <strong>Department:</strong>{' '}
                    {departmentsMap[request.department_id]?.name}
                  </span>
                </div>
                {type === CONSTANTS.ADMIN && !editing && (
                  <Button
                    id={request.id}
                    data-testid={`edit-toggle-${request.id}`}
                    onClick={this.toggleEditing}
                  >
                    Edit
                  </Button>
                )}
                {editing && [
                  <Button
                    key='1'
                    id={request.id}
                    onClick={this.changeStatus}
                    data-testid={`submit-update-${request.id}`}
                    variant='success'
                  >
                    Save
                  </Button>,
                  <Button
                    key='2'
                    id={request.id}
                    onClick={this.toggleEditing}
                    data-testid={`cancel-${request.id}`}
                    variant='danger'
                  >
                    Cancel
                  </Button>,
                ]}
              </CardHeader>
              {type === CONSTANTS.ADMIN && editing && (
                <FormSelect
                  id={request.id}
                  data-testid={'select-department'}
                  onChange={this.onChange}
                  value={requestsMap[request.id]?.status}
                >
                  <option value={STATUS.PENDING}>{STATUS.PENDING}</option>
                  <option value={STATUS.RESOLVED}>{STATUS.RESOLVED}</option>
                </FormSelect>
              )}
              <CardBody>
                <div>
                  <strong>Type:</strong> {request?.maintenance_type}
                </div>
                <div>
                  <strong>Printer:</strong>{' '}
                  {`${printersMap[request.printer_id]?.location} - ${printersMap[request.printer_id]?.brand} - ${printersMap[request.printer_id]?.model} `}
                </div>
                <div>
                  <strong>Description:</strong> {request?.description}
                </div>
              </CardBody>
            </Card>
          );
        })}
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
