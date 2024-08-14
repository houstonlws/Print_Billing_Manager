import { BillingState } from './billing.types';
import { AuthState, AdminState } from './auth.types';
import { PrinterState } from './printer.types';
import { TrackingState } from './tracking.types';

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

export class Map {
  static of<T>(arr: any[]): TypeMap<T> {
    let map: TypeMap<T> = {};
    for (const o of arr) {
      map[o.id] = o;
    }
    return map;
  }
}
