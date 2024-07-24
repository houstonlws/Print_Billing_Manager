import React, { Component, ReactNode } from 'react';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Stack,
} from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { Printer } from '../../../types/printer.types';
import { deletePrinter } from '../../../store/actions/printer.actions';
import EditPrinterComponent from './edit-printer.component';

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

  render(): ReactNode {
    const { printer } = this.props;

    return (
      <AccordionItem eventKey={printer.id} style={{ marginTop: '5px' }}>
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
            <div>
              <strong>Department:</strong> {printer.department_id}
            </div>
          </Stack>
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
          <EditPrinterComponent printer={printer}></EditPrinterComponent>
        </AccordionBody>
      </AccordionItem>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  deletePrinter,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector> & Props;

export default connector(PrinterDetails);
