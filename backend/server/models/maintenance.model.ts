export interface MaintenanceRequest {
  id: string;
  department_id: string;
  printer_id: string;
  request_date: string;
  maintenance_type: string;
  description: string;
  status: string;
}