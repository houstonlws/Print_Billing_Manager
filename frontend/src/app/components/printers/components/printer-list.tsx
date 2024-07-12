import React, { Component, ReactNode } from "react";
import { Accordion } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import { Printer } from "../../../types/printer.types";
import { AppState } from "../../../types/app.types";
import { addPrinter } from "../../../store/actions/printer.actions";
import PrinterDetails from "./printer-details";

const initialState: Printer = {
  id: "",
  serial_number: "",
  model: "",
  brand: "",
  location: "",
  installation_date: "",
  warranty_expiry_date: "",
  ip_address: "",
  mac_address: "",
  firmware_version: "",
  department_id: "",
};

interface PrinterListProps {
  printers: Printer[];
}

interface State {
  adding: boolean;
  tempPrinter: Printer;
}

class PrinterList extends Component<ListProps, State> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      adding: false,
      tempPrinter: initialState,
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
      case "firmware":
        tempPrinter.firmware_version = event.target.value;
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

  toggleAdding = () => {
    this.setState((prevState) => ({
      adding: !prevState.adding,
    }));
  };

  cancelAdd = () => {
    this.setState({ tempPrinter: initialState });
    this.toggleAdding();
  };

  addPrinter = () => {
    this.props.addPrinter(this.state.tempPrinter);
    window.alert("Added Printer");
  };

  render(): ReactNode {
    const { printers } = this.props!;

    return (
      <Accordion>
        {printers?.map((printer: Printer, index) => (
          <PrinterDetails key={index} printer={printer}></PrinterDetails>
        ))}
      </Accordion>
    );
  }
}

const mapStateToProps = (state: AppState, props: PrinterListProps) => {
  return {
    printers: props.printers,
    selected: state.printer.selected,
  };
};

const mapDispatchToProps = {
  addPrinter,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ListProps = ConnectedProps<typeof connector>;

export default connector(PrinterList);
