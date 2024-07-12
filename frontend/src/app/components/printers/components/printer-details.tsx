import React, { Component, ReactNode } from "react";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Stack,
} from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { Printer } from "../../../types/printer.types";
import {
  deletePrinter,
  updatePrinter,
} from "../../../store/actions/printer.actions";

interface DetailsState {
  editing: boolean;
  tempPrinter: Printer;
}

interface Props {
  printer: Printer;
}

class PrinterDetails extends Component<PropsFromRedux, DetailsState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {
      editing: false,
      tempPrinter: { ...props.printer },
    };
  }

  onChange = (event: any) => {
    const { tempPrinter } = this.state;
    switch (event.target.id) {
      case "serial":
        tempPrinter.serial_number = event.target.value;
        break;
      case "brand":
        tempPrinter.brand = event.target.value;
        break;
      case "model":
        tempPrinter.model = event.target.value;
        break;
      case "location":
        tempPrinter.location = event.target.value;
        break;
      case "ip":
        tempPrinter.ip_address = event.target.value;
        break;
      case "mac":
        tempPrinter.mac_address = event.target.value;
        break;
      case "install_date":
        tempPrinter.installation_date = event.target.value;
        break;
      case "warranty":
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
    window.alert("Printer updated");
    this.toggleEditing();
  };

  discardEdit = () => {
    this.setState({ tempPrinter: { ...this.props.printer } });
    this.toggleEditing();
  };

  deletePrinter = (event: any) => {
    const { id } = event.target;
    const printerId = id.split("delete").pop();
    this.props.deletePrinter(printerId);
    window.alert("Printer deleted");
    this.toggleEditing();
  };

  render(): ReactNode {
    const { printer } = this.props;
    const { editing, tempPrinter } = this.state;

    if (editing) {
      return (
        <Card className="mb-2">
          <CardHeader className="d-flex justify-content-center">
            <CardTitle className="me-auto">Edit Printer</CardTitle>
            <ButtonGroup>
              <Button variant="secondary" onClick={this.discardEdit}>
                Cancel
              </Button>
              <Button variant="success" onClick={this.saveEdit}>
                Save
              </Button>
            </ButtonGroup>
          </CardHeader>
          <CardBody>
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
          </CardBody>
          <CardFooter className="d-flex">
            <div className="me-auto"></div>
            <Button variant="danger">Delete</Button>
          </CardFooter>
        </Card>
      );
    }

    return (
      <AccordionItem eventKey={printer.id} style={{ marginTop: "5px" }}>
        <AccordionHeader className="d-flex justify-content-between">
          <Stack direction="horizontal" gap={3}>
            <div>
              <strong>Serial:</strong> {printer.serial_number}
            </div>
            <div>
              <strong>Model:</strong> {printer.model}
            </div>
            <div>
              <strong>Brand:</strong> {printer.brand}
            </div>
            <div>
              <strong>Location:</strong> {printer.location}
            </div>
          </Stack>
        </AccordionHeader>
        <AccordionBody
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #c8c8c8",
          }}
        >
          <div>
            <div>
              <strong>IP Address:</strong> {printer?.ip_address}
            </div>
            <div>
              <strong>MAC Address:</strong> {printer?.mac_address}
            </div>
            <div>
              <strong>Firmware Version:</strong>
              {printer?.firmware_version}
            </div>
            <div>
              <strong>Installation Date:</strong>
              {printer?.installation_date}
            </div>
            <div>
              <strong>Warranty Expiry Date:</strong>
              {printer?.warranty_expiry_date}
            </div>
          </div>
          <div>
            <Button onClick={this.toggleEditing}>Edit</Button>
          </div>
        </AccordionBody>
      </AccordionItem>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  updatePrinter,
  deletePrinter,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector> & Props;

export default connector(PrinterDetails);
