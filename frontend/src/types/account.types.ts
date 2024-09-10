export type User = {
  id: string;
  email: string;
  type: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  department_id: string;
  phone?: string;
};

export type Notification = {
  id: string;
  user_id: string;
  notification_date: string;
  message: string;
  is_read: string;
};

export type AccountState = {
  user: User;
  notifications: Notification[];
};
