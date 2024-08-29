export type Invoice = {
  id: string;
  department_id: string;
  month: string;
  year: string;
  price_profile_id: string;
  bw_charge: string;
  color_charge: string;
  paper_charge: string;
  status: string;
};

export type BillingState = {
  currentInvoice: Invoice;
  invoiceHistory: Invoice[];
};
