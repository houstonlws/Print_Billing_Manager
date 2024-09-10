import React, { Component, ReactNode } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Stack,
} from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '../../../../types/app.types';
import { addPrinter } from '../../../../store/actions/printer.actions';
import { Printer } from '../../../../types/printer.types';
import AddPrinterComponent from './components/add-printer.component';
import EditPrinterComponent from './components/edit-printer.component';
import { CONSTANTS } from '../../../../config/constants';
import ReportIssueComponent from '../maintenance/components/report-issue.component';
import { departmentsMap } from '../../../../config/app-data';

interface State {
  adding: boolean;
  tempPrinter: Printer;
}

type Props = {
  departmentId: string;
};

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
  };

  render(): ReactNode {
    const {
      printers,
      account: {
        user: { type },
      },
      departmentId,
    } = this.props!;

    return (
      <Stack data-testid='printers-component' gap={3}>
        {type === CONSTANTS.ADMIN && (
          <AddPrinterComponent
            departmentId={departmentId}
          ></AddPrinterComponent>
        )}
        <Accordion>
          {printers?.map((printer: Printer, index) => (
            <AccordionItem
              key={index}
              eventKey={printer.id}
              style={{ marginTop: '5px' }}
            >
              <AccordionHeader className='d-flex  justify-content-center'>
                <div style={{ width: '350px' }}>
                  <div>
                    <strong>Department:</strong>{' '}
                    {`${departmentsMap[printer.department_id]?.name}`}
                  </div>
                  <strong>Location:</strong> {printer.location}
                </div>
                <div style={{ width: '350px' }}>
                  <div>
                    <strong>Brand:</strong> {printer.brand}
                  </div>
                  <strong>Model:</strong> {printer.model}
                </div>
              </AccordionHeader>
              <AccordionBody
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #c8c8c8',
                }}
              >
                <div>
                  <div>
                    <strong>Serial:</strong> {printer.serial_number}
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
                <div className='d-flex'>
                  {type === CONSTANTS.ADMIN && (
                    <EditPrinterComponent
                      printer={printer}
                    ></EditPrinterComponent>
                  )}
                  <ReportIssueComponent></ReportIssueComponent>
                </div>
              </AccordionBody>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    );
  }
}

const connector = connect(
  (state: AppState) => ({
    account: state.account,
    printers: state.printer?.printers,
    auth: state.auth,
  }),
  {
    addPrinter,
  }
);

type PrintersComponentProps = ConnectedProps<typeof connector> & Props;

export default connector(PrintersComponent);
