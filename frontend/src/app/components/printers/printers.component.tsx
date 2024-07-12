import React, { Component, ReactNode } from "react";
import { Spinner, Stack } from "react-bootstrap";
import { ConnectedProps, connect } from "react-redux";
import { AppState } from "../../types/app.types";
import { addPrinter } from "../../store/actions/printer.actions";
import { Printer } from "../../types/printer.types";
import PrinterList from "./components/printer-list";
import AddPrinterComponent from "./components/add-printer.component";

interface State {
  adding: boolean;
  tempPrinter: Printer;
}

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

class PrintersComponent extends Component<PrintersComponentProps, State> {
  constructor(props: PrintersComponentProps) {
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
    const { printers, loading, type } = this.props!;

    if (loading) {
      return <Spinner animation="border"></Spinner>;
    }
    return (
      <Stack gap={3}>
        {type === "Admin" && <AddPrinterComponent></AddPrinterComponent>}
        <PrinterList printers={printers}></PrinterList>
      </Stack>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    loading: state.printer?.loading,
    printers: state.printer?.printers,
    type: state.auth?.user?.type,
  };
};

const mapDispatchToProps = {
  addPrinter,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(PrintersComponent);

type PrintersComponentProps = ConnectedProps<typeof connector>;
