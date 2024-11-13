import React from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Card,
  CardHeader,
  Stack,
} from 'react-bootstrap';
import { ConnectedProps, connect } from 'react-redux';
import { departmentsMap } from '../../../../config/app-data';
import { CONSTANTS } from '../../../../config/constants';
import { addPrinter } from '../../../../store/actions/printer.actions';
import { AppState, Printer } from '../../../../types';
import ReportIssueComponent from '../maintenance/components/report-issue.component';
import AddPrinterComponent from './components/add-printer.component';
import EditPrinterComponent from './components/edit-printer.component';

type Props = {
  departmentId?: string;
};

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

const PrintersComponent = (props: PrintersComponentProps) => {
  const {
    printers,
    account: {
      user: { type },
    },
    departmentId,
  } = props;

  return (
    <Stack data-testid='printers-component' gap={3}>
      {type === CONSTANTS.ADMIN && (
        <AddPrinterComponent departmentId={departmentId}></AddPrinterComponent>
      )}
      {type === CONSTANTS.USER && (
        <Card>
          <CardHeader>
            <h2>Printers</h2>
          </CardHeader>
        </Card>
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
};

export default connector(PrintersComponent);
