import React, { Component, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  Row,
} from 'react-bootstrap';
import { MaintenanceRequest } from '../../../../../types/printer.types';
import { CONSTANTS } from '../../../../../config/constants';
import { maintenanceTypes } from '../../../../../config/app-data';
import { addMaintenanceRequest } from '../../../../../store/actions/printer.actions';
import { AppState } from '../../../../../types/app.types';

interface State {
  reportData: MaintenanceRequest;
  reporting: boolean;
}

interface Props {}

class ReportIssue extends Component<ReportProps, State> {
  constructor(props: ReportProps) {
    super(props);
    const today = new Date().toISOString().split('T')[0];
    this.state = {
      reporting: false,
      reportData: {
        id: '',
        printer_id: '',
        department_id: props.depId,
        request_date: today,
        maintenance_type: '',
        description: '',
        status: 'Pending',
      },
    };
  }

  onChange = (event: any) => {
    let { reportData } = this.state;
    switch (event.target.id) {
      case 'maintenance_type':
        reportData.maintenance_type = event.target.value;
        break;
      case 'description':
        reportData.description = event.target.value;
        break;
      case 'printer_id':
        reportData.printer_id = event.target.value;
        break;
      default:
        return;
    }
    this.setState({ reportData: reportData });
  };

  toggleReporting = () => {
    this.setState((prevState) => ({
      reporting: !prevState.reporting,
    }));
  };

  submitReport = () => {
    const { reportData } = this.state;
    this.props.addMaintenanceRequest(reportData);
    this.toggleReporting();
  };

  cancelReport = () => {
    const today = new Date().toISOString().split('T')[0];
    this.setState({
      reportData: {
        id: '',
        printer_id: '',
        department_id: this.props.depId,
        request_date: today,
        maintenance_type: '',
        description: '',
        status: 'Pending',
      },
    });
    this.toggleReporting();
  };

  render(): ReactNode {
    const { reporting, reportData } = this.state;
    const { printers } = this.props;

    return (
      <div data-testid={'report-issue-root'}>
        <div>
          <Button data-testid={`report-toggler`} onClick={this.toggleReporting}>
            Add Request
          </Button>
        </div>
        <Modal
          show={reporting}
          onHide={this.cancelReport}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header className='d-flex justify-content-center' closeButton>
            <Modal.Title className='me-auto'>Request Maintenance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup as={Row}>
                <FormLabel>Select A Printer</FormLabel>
                <FormSelect
                  id='printer_id'
                  data-testid='printer_id'
                  onChange={this.onChange}
                  value={reportData.printer_id}
                >
                  <option value=''>--Select A Printer</option>
                  {printers?.map((printer, index) => (
                    <option value={printer.id} key={index}>
                      {`${printer.location} - ${printer.brand} - ${printer.model}`}
                    </option>
                  ))}
                </FormSelect>
                <FormLabel>Maintenance Type</FormLabel>
                <FormSelect
                  className='form-control'
                  id='maintenance_type'
                  data-testid='maintenance_type'
                  onChange={this.onChange}
                  value={reportData.maintenance_type}
                >
                  <option value=''>--Select A Maintenance Reason</option>
                  {maintenanceTypes?.map((type, index) => (
                    <option value={type} key={index}>
                      {type}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel>Description</FormLabel>
                <FormControl
                  type='text'
                  id='description'
                  placeholder='description'
                  onChange={this.onChange}
                  value={reportData.description}
                ></FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button variant='secondary' onClick={this.cancelReport}>
                Cancel
              </Button>
              <Button
                data-testid='submit-report'
                variant='success'
                onClick={this.submitReport}
              >
                Submit
              </Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  printers: state.printer.printers,
  depId: state.auth.user.department_id,
});

const mapDispatchToProps = {
  addMaintenanceRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReportProps = ConnectedProps<typeof connector> & Props;

export default connector(ReportIssue);
