export interface Printer {
  id: string;
  serial_number: string;
  model?: string;
  brand?: string;
  location?: string;
  installation_date?: string;
  warranty_expiry_date?: string;
  ip_address?: string;
  mac_address?: string;
  firmware_version?: string;
  department_id?: string;
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

export interface PriceConfig {
  id: string;
  name: string;
  bw_price: string;
  color_price: string;
  paper_price: string;
  is_active: string;
}

export interface Job {
  id: string;
  printer_id: string;
  department_id: string;
  date: string;
  title: string;
  pages: string;
  color_pages: string;
  black_and_white_pages: string;
}
