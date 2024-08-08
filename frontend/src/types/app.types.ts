import { BillingState } from './billing.types';
import { AuthState } from './auth.types';
import { PrinterState } from './printer.types';

export interface AppState {
  auth: AuthState;
  billing: BillingState;
  printer: PrinterState;
}

export type Map<T> = { [key: string]: T };
