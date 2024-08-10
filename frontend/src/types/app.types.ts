import { BillingState } from './billing.types';
import { AuthState, AdminState } from './auth.types';
import { PrinterState } from './printer.types';

export interface AppState {
  auth: AuthState;
  billing: BillingState;
  printer: PrinterState;
  admin: AdminState;
}

export interface IMap<T> {
  [key: string]: T;
}

export class Map<T> {
  static of<T>(arr: any[]): IMap<T> {
    let map: IMap<T> = {};
    for (const o of arr) {
      map[o.id] = o;
    }
    return map;
  }
}
