export type User = {
  id: string;
  email: string;
  type?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  department_id?: string;
  phone?: string;
};

export type Notification = {
  id: string;
  department_id: string;
  maintenance_id: string;
  notification_date: string;
  message: string;
  is_read: string;
};

export type PriceConfig = {
  id: string;
  name: string;
  bw_price: string;
  color_price: string;
  paper_price: string;
  is_active: string;
};
