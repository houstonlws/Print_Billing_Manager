import React, { Component, ReactNode } from 'react';
import { Accordion } from 'react-bootstrap';
import { Printer } from '../../../types/printer.types';
import PrinterDetails from './printer-details';

interface PrinterListProps {
  printers: Printer[];
}

class PrinterList extends Component<PrinterListProps> {
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

export default PrinterList;
