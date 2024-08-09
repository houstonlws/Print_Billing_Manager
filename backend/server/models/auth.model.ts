export interface User {
  id: string;
  email: string;
  type?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  department_id?: string;
  phone?: string;
}

export interface Notification {
  id: string;
  department_id: string;
  maintenance_id: string;
  notification_date: string;
  message: string;
  is_read: string;
}
