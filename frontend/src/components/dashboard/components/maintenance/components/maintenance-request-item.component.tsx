import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState, MaintenanceRequest } from '../../../../../types';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
} from 'react-bootstrap';
import { departmentsMap } from '../../../../../config/app-data';
import { CONSTANTS } from '../../../../../config/constants';
import { upDateMaintenanceRequestStatus } from '../../../../../store/actions';

interface State {
  editing: boolean;
  status: string;
  original: string;
}

interface Props {
  request: MaintenanceRequest;
}

class MaintenanceRequestItem extends Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      editing: false,
      original: props.request.status,
      status: props.request.status,
    };
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  };

  onChange = async (event: any) => {
    this.setState({ status: event.target.id });
  };

  changeStatus = async () => {
    const { status } = this.state;
    const { request } = this.props;
    await this.props.upDateMaintenanceRequestStatus(request.id, status);
    this.toggleEditing();
    window.location.reload();
  };

  render(): React.ReactNode {
    const { editing } = this.state;
    const {
      request,
      account: {
        user: { type },
      },
      printer: { printersMap },
    } = this.props;
    return (
      <Card
        data-testid={`maintenance-item-${request.id}`}
        key={request.id}
        className='mt-2'
      >
        {!editing && (
          <CardHeader className='d-flex align-items-center'>
            <div className='me-auto'>
              <Badge bg={request.status === 'Resolved' ? 'success' : 'warning'}>
                {request.status}
              </Badge>
            </div>
            <div className='d-flex'>
              {type === CONSTANTS.ADMIN && !editing && (
                <Button
                  id={request.id}
                  data-testid={`edit-toggle-${request.id}`}
                  onClick={this.toggleEditing}
                >
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
        )}
        {type === CONSTANTS.ADMIN && editing && (
          <CardHeader className='d-flex align-items-center'>
            <div className='me-auto'>
              <div className='d-flex'>
                <Badge
                  bg={request.status === 'Resolved' ? 'success' : 'warning'}
                >
                  {request.status}
                </Badge>
                <Form onChange={this.onChange} className='mx-3'>
                  <Form.Check
                    inline
                    id='Pending'
                    name='status'
                    label='Pending'
                    type='radio'
                  />
                  <Form.Check
                    inline
                    id='Resolved'
                    name='status'
                    label='Resolved'
                    type='radio'
                  />
                </Form>
              </div>
            </div>
            <Button
              id={request.id}
              onClick={this.changeStatus}
              data-testid={`submit-update-${request.id}`}
              variant='success'
              className='mx-1'
            >
              Save
            </Button>
            <Button
              id={request.id}
              onClick={this.toggleEditing}
              data-testid={`cancel-${request.id}`}
              variant='danger'
            >
              Cancel
            </Button>
          </CardHeader>
        )}
        <CardBody>
          <div>
            <strong>Date Issued:</strong> {request.request_date}
          </div>
          <div>
            <strong>Department:</strong>{' '}
            {departmentsMap[request.department_id]?.name}
          </div>
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
  }
}

const mapStateToProps = (state: AppState) => ({
  account: state.account,
  printer: state.printer,
});
const mapDispatchToProps = {
  upDateMaintenanceRequestStatus,
};
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector> & Props;
export default connector(MaintenanceRequestItem);
