import {
  AuthState,
  AdminState,
  PrinterState,
  BillingState,
  TrackingState,
  AccountState,
} from './';

export interface AppState {
  account: AccountState;
  auth: AuthState;
  billing: BillingState;
  printer: PrinterState;
  tracking: TrackingState;
  admin: AdminState;
}

export type TypeMap<T> = {
  [key: string]: T;
};
