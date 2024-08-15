import {
  AuthState,
  AdminState,
  PrinterState,
  BillingState,
  TrackingState,
} from './';

export interface AppState {
  auth: AuthState;
  billing: BillingState;
  printer: PrinterState;
  tracking: TrackingState;
  admin: AdminState;
}

export type TypeMap<T> = {
  [key: string]: T;
};
