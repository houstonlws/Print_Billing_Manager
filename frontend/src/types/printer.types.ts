import { TypeMap } from './app.types';

export type Printer = {
  id: string;
  department_id: string;
  serial_number: string;
  model?: string;
  brand?: string;
  location?: string;
  installation_date?: string;
  warranty_expiry_date?: string;
  ip_address?: string;
  mac_address?: string;
  firmware_version?: string;
};

export type MaintenanceRequest = {
  id: string;
  department_id: string;
  printer_id: string;
  request_date: string;
  maintenance_type: string;
  description: string;
  status: string;
};

export interface PrinterState {
  printers: Printer[];
  requests: MaintenanceRequest[];
  printersMap: TypeMap<Printer>;
}
