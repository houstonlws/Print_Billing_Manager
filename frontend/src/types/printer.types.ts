import { IMap } from './app.types';

export interface Printer {
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
}

export interface Metric {
  id: string;
  printer_id: string;
  total_pages_printed: string;
  monthly_print_volume: string;
  total_print_jobs: string;
  monthly_print_jobs: string;
  toner_levels: string;
  toner_usage_monthly: string;
  paper_levels: string;
  paper_usage_monthly: string;
  total_color_pages_printed: string;
  total_color_pages_last_billing: string;
  total_bw_pages_printed: string;
  total_bw_pages_last_billing: string;
}

export interface MaintenanceRequest {
  id: string;
  department_id: string;
  printer_id: string;
  request_date: string;
  maintenance_type: string;
  description: string;
  status: string;
}

export interface PrinterState {
  printers: Printer[];
  metrics: Metric[];
  requests: MaintenanceRequest[];
  printersMap: IMap<Printer>;
}
