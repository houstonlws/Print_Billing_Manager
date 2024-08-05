import React, { Component, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import {
  Button,
  Card,
  CardHeader,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
} from 'react-bootstrap';
import { Printer } from '../../../../../types/printer.types';
import {
  addPrinter,
  getDepartmentPrinters,
} from '../../../../../store/actions/printer.actions';
import { departments } from '../../../../../config/app-data';

interface State {
  tempPrinter: Printer;
  adding: boolean;
}

const initialState: Printer = {
  id: '',
  serial_number: '',
  model: '',
  brand: '',
  location: '',
  installation_date: '',
  warranty_expiry_date: '',
  ip_address: '',
  mac_address: '',
  firmware_version: '',
  department_id: '',
};

class AddPrinterComponent extends Component<AddProps, State> {
  constructor(props: AddProps) {
    super(props);
    this.state = {
      adding: false,
      tempPrinter: { ...initialState },
    };
  }

  onChange = (event: any) => {
    const { tempPrinter } = this.state;

    switch (event.target.id) {
      case 'serial':
        tempPrinter.serial_number = event.target.value;
        break;
      case 'brand':
        tempPrinter.brand = event.target.value;
        break;
      case 'model':
        tempPrinter.model = event.target.value;
        break;
      case 'location':
        tempPrinter.location = event.target.value;
        break;
      case 'ip':
        tempPrinter.ip_address = event.target.value;
        break;
      case 'mac':
        tempPrinter.mac_address = event.target.value;
        break;
      case 'firmware':
        tempPrinter.firmware_version = event.target.value;
        break;
      case 'install_date':
        tempPrinter.installation_date = event.target.value;
        break;
      case 'warranty':
        tempPrinter.warranty_expiry_date = event.target.value;
        break;
      default:
        return;
    }
    this.setState({ tempPrinter });
  };

  setDepartment = async (event: any) => {
    await this.props.getDepartmentPrinters(event.target.value);
  };

  toggleAdding = () => {
    this.setState((prev) => ({
      adding: !prev.adding,
    }));
  };

  cancelAdd = () => {
    this.setState({ tempPrinter: { ...initialState } });
    this.toggleAdding();
  };

  addPrinter = () => {
    this.props.addPrinter(this.state.tempPrinter);
    window.alert('Added Printer');
  };

  render(): ReactNode {
    const { adding, tempPrinter } = this.state;

    return (
      <div data-testid='addprinter'>
        <Card>
          <CardHeader className='d-flex justify-content-between'>
            <h2>Printers</h2>
            <Button data-testid='toggle-add' onClick={this.toggleAdding}>
              Add
            </Button>
          </CardHeader>
          <FormSelect id={'department'} onChange={this.setDepartment}>
            <option value={''}>--Select a Department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </FormSelect>
        </Card>
        <Modal
          show={adding}
          onHide={this.cancelAdd}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Printer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <FormLabel>Serial</FormLabel>
                <FormControl
                  type='text'
                  id='serial'
                  placeholder='Serial'
                  onChange={this.onChange}
                  value={tempPrinter.serial_number}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Model</FormLabel>
                <FormControl
                  type='text'
                  id='model'
                  placeholder='Model'
                  onChange={this.onChange}
                  value={tempPrinter.model}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Brand</FormLabel>
                <FormControl
                  type='text'
                  id='brand'
                  placeholder='Brand'
                  onChange={this.onChange}
                  value={tempPrinter.brand}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Location</FormLabel>
                <FormControl
                  type='text'
                  id='location'
                  placeholder='Location'
                  onChange={this.onChange}
                  value={tempPrinter.location}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>IP Address</FormLabel>
                <FormControl
                  type='text'
                  id='ip'
                  placeholder='IP Address'
                  onChange={this.onChange}
                  value={tempPrinter.ip_address}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>MAC Address</FormLabel>
                <FormControl
                  type='text'
                  id='mac'
                  placeholder='MAC Address'
                  onChange={this.onChange}
                  value={tempPrinter.mac_address}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Firmware Version</FormLabel>
                <FormControl
                  type='text'
                  id='firmware'
                  placeholder='Firmware Version'
                  onChange={this.onChange}
                  value={tempPrinter.firmware_version}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Installation Date</FormLabel>
                <FormControl
                  type='text'
                  id='install_date'
                  placeholder='Installation Date'
                  onChange={this.onChange}
                  value={tempPrinter.installation_date}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Warranty Expiration</FormLabel>
                <FormControl
                  type='text'
                  id='warranty'
                  placeholder='Warranty Expiration'
                  onChange={this.onChange}
                  value={tempPrinter.warranty_expiry_date}
                ></FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.cancelAdd}>
              Cancel
            </Button>
            <Button
              data-testid='submit-add'
              variant='primary'
              onClick={this.addPrinter}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  addPrinter,
  getDepartmentPrinters,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AddProps = ConnectedProps<typeof connector>;

export default connector(AddPrinterComponent);
