export interface Printer {
    id: string;
    serialNumber: string;
    model?: string;
    brand?: string;
    location?: string;
    installationDate?: string;
    warrantyExpiryDate?: string;
    ipAddress?: string;
    macAddress?: string;
    firmwareVersion?: string;
    departmentId?: string 
}