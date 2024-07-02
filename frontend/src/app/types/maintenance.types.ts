export interface MaintenanceState {
    requests: MaintenanceRequest[]
}

export interface MaintenanceRequest {
    id: string,
    printer_id: string
    request_date: string,
    maintenance_type: string, 
    description: string, 
    status: string
}