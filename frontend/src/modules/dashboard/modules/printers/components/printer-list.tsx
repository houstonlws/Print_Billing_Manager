import React, { Component, ReactNode } from "react";
import PrinterDetails from "./printer-details";
import { Printer } from "../utilities/printer.model";

interface PrinterListProps {
    printers: Printer[]
}

class PrinterList extends Component<PrinterListProps> {

  render(): ReactNode {

    const { printers } = this.props!

    return (
        <div className="row">
            {printers?.map((printer, index) => (
                <PrinterDetails key={index} printer={printer}></PrinterDetails>
            ))}
        </div>
    );
  }
}

export default PrinterList;
