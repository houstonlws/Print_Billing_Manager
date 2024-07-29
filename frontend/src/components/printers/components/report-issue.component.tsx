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
import { MaintenanceRequest, Printer } from '../../../types/printer.types';
import { CONSTANTS } from '../../../config/constants';
import { maintenanceTypes } from '../../../config/app-data';
import { addMaintenanceRequest } from '../../../store/actions/printer.actions';

interface State {
  reportData: MaintenanceRequest;
  reporting: boolean;
}

interface Props {
  printer: Printer;
}

class ReportIssue extends Component<ReportProps, State> {
  constructor(props: ReportProps) {
    super(props);
    const today = new Date().toISOString().split('T')[0];
    this.state = {
      reporting: false,
      reportData: {
        printer_id: props.printer.id,
        request_date: today,
        maintenance_type: '',
        description: '',
        status: CONSTANTS.PENDING,
      },
    };
  }

  onChange = (event: any) => {
    const { reportData } = this.state;
    switch (event.target.id) {
      case 'maintenance_type':
        reportData.maintenance_type = event.target.value;
        break;
      case 'description':
        reportData.description = event.target.value;
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
        printer_id: this.props.printer.id,
        request_date: today,
        maintenance_type: '',
        description: '',
        status: CONSTANTS.PENDING,
      },
    });
    this.toggleReporting();
  };

  render(): ReactNode {
    const { reporting, reportData } = this.state;
    const { printer } = this.props;

    return (
      <div>
        <div data-testid={`report-issue-${printer.id}`}>
          <Button data-testid={`report-toggler`} onClick={this.toggleReporting}>
            Maintenance
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
                data-testId='submit-report'
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

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addMaintenanceRequest,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReportProps = ConnectedProps<typeof connector> & Props;

export default connector(ReportIssue);
