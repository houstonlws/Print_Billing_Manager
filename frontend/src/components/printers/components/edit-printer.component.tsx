import React, { Component, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
} from 'react-bootstrap';
import { Printer } from '../../../types/printer.types';
import { updatePrinter } from '../../../store/actions/printer.actions';

interface State {
  tempPrinter: Printer;
  editing: boolean;
}

interface Props {
  printer: Printer;
}

class EditPrinter extends Component<EditProps, State> {
  constructor(props: EditProps) {
    super(props);
    this.state = {
      editing: false,
      tempPrinter: { ...props.printer },
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

  toggleEditing = () => {
    this.setState((prevState) => ({
      editing: !prevState.editing,
    }));
  };

  saveEdit = () => {
    const { tempPrinter } = this.state;
    this.props.updatePrinter(tempPrinter);
    window.alert('Printer updated');
    this.toggleEditing();
  };

  discardEdit = () => {
    this.setState({ tempPrinter: { ...this.props.printer } });
    this.toggleEditing();
  };

  render(): ReactNode {
    const { editing, tempPrinter } = this.state;

    return (
      <>
        <div>
          <Button onClick={this.toggleEditing}>Edit</Button>
        </div>
        <Modal
          show={editing}
          onHide={this.discardEdit}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header className="d-flex justify-content-center" closeButton>
            <Modal.Title className="me-auto">Edit Printer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup as={Row}>
                <FormLabel>Serial</FormLabel>
                <FormControl
                  type="text"
                  id="serial"
                  onChange={this.onChange}
                  value={tempPrinter.serial_number}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Model</FormLabel>
                <FormControl
                  type="text"
                  id="model"
                  onChange={this.onChange}
                  value={tempPrinter.model}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Brand</FormLabel>
                <FormControl
                  type="text"
                  id="brand"
                  onChange={this.onChange}
                  value={tempPrinter.brand}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Location</FormLabel>
                <FormControl
                  type="text"
                  id="location"
                  onChange={this.onChange}
                  value={tempPrinter.location}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>IP Address</FormLabel>
                <FormControl
                  type="text"
                  id="ip"
                  onChange={this.onChange}
                  value={tempPrinter.ip_address}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>MAC Address</FormLabel>
                <FormControl
                  type="text"
                  id="mac"
                  onChange={this.onChange}
                  value={tempPrinter.mac_address}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Firmware Version</FormLabel>
                <FormControl
                  type="text"
                  id="firmware"
                  onChange={this.onChange}
                  value={tempPrinter.firmware_version}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Installation Date</FormLabel>
                <FormControl
                  type="text"
                  id="install_date"
                  onChange={this.onChange}
                  value={tempPrinter.installation_date}
                ></FormControl>
              </FormGroup>
              <FormGroup>
                <FormLabel>Warranty Expiration</FormLabel>
                <FormControl
                  type="text"
                  id="warranty"
                  onChange={this.onChange}
                  value={tempPrinter.warranty_expiry_date}
                ></FormControl>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button variant="secondary" onClick={this.discardEdit}>
                Cancel
              </Button>
              <Button variant="success" onClick={this.saveEdit}>
                Save
              </Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updatePrinter,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type EditProps = ConnectedProps<typeof connector> & Props;

export default connector(EditPrinter);
