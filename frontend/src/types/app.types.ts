import {
  AccountState,
  AdminState,
  AuthState,
  BillingState,
  PrinterState,
  TrackingState,
} from '.';

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
