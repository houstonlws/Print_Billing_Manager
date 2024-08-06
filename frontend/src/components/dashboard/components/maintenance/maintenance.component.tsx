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
import { AppState } from '../../../../types/app.types';
import { MaintenanceRequest } from '../../../../types/printer.types';
import { CONSTANTS } from '../../../../config/constants';
import { departments, STATUS } from '../../../../config/app-data';
import {
  getDepartmentMaintenanceRequests,
  upDateMaintenanceRequest,
} from '../../../../store/actions/printer.actions';

interface State {
  requests: MaintenanceRequest[];
  editing: boolean;
}

class MaintenanceComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      requests: [],
      editing: false,
    };
  }

  onChange = async (event: any) => {
    switch (event.target.id) {
      case 'status':
    }
  };

  toggleEditing = () => {
    this.setState((prev) => ({
      editing: !prev.editing,
    }));
  };

  updateRequest = async (event: any) => {
    const { requests } = this.props.printer;
    const request = requests.find((r) => r.id === event.target.id)!;
    await this.props.upDateMaintenanceRequest(request);
  };

  render(): ReactNode {
    const { requests, printers } = this.props.printer;
    const { type } = this.props.user;
    const { editing } = this.state;

    return (
      <Stack data-testid='maintenance-component' gap={1}>
        <Card>
          <CardHeader>
            <h2>Maintenance Requests</h2>
          </CardHeader>
        </Card>
        {requests?.map((request, index) => {
          const printer = printers.find((p) => p.id === request.printer_id)!;
          return (
            <Card
              data-testid={`maintenance-item-${request.id}`}
              key={index}
              className='mt-2'
            >
              <CardHeader className='d-flex'>
                <div className='me-auto'>
                  <strong>Date Issued:</strong> {request.request_date}
                </div>
                <Badge
                  bg={request.status === 'Resolved' ? 'success' : 'warning'}
                >
                  {request.status}
                </Badge>
                {type === CONSTANTS.ADMIN && (
                  <Button
                    data-testid={`edit-toggle-${request.id}`}
                    onClick={this.toggleEditing}
                  >
                    {editing ? 'Cancel' : 'Edit'}
                  </Button>
                )}
              </CardHeader>
              {type === CONSTANTS.ADMIN && editing && (
                <FormSelect
                  id={'status'}
                  data-testid={'select-department'}
                  onChange={this.onChange}
                  value={request.status}
                >
                  <option value={''}>--Status</option>
                  <option value={STATUS.PENDING}>{STATUS.PENDING}</option>
                  <option value={STATUS.RESOLVED}>{STATUS.RESOLVED}</option>
                </FormSelect>
              )}
              <CardBody>
                <div>
                  <strong>Type:</strong> {request?.maintenance_type}
                </div>
                <div>
                  <strong>Description:</strong> {request?.description}
                </div>
                <div>
                  <strong>Printer:</strong>
                  <ul>
                    <li>
                      <strong>Serial</strong> {printer?.serial_number}
                    </li>
                    <li>
                      <strong>Location</strong> {printer?.location}
                    </li>
                    <li>
                      <strong>Brand</strong> {printer?.brand}
                    </li>
                    <li>
                      <strong>Model</strong> {printer?.model}
                    </li>
                  </ul>
                </div>
              </CardBody>
              {editing && (
                <Button
                  id={request.id}
                  onClick={this.updateRequest}
                  data-testid={`submit-update-${request.id}`}
                >
                  Save
                </Button>
              )}
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
  upDateMaintenanceRequest,
};

type Props = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MaintenanceComponent);
