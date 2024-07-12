import { BillingState } from "./billing.types";
import { AuthState } from "./auth.types";
import { DataState } from "./data.types";
import { MaintenanceState } from "./maintenance.types";
import { PrinterState } from "./printer.types";

export interface AppState {
  auth: AuthState;
  data: DataState;
  billing: BillingState;
  maintenance: MaintenanceState;
  printer: PrinterState;
}
