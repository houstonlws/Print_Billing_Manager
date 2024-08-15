export type Bill = {
  id: string;
  department_id: string;
  billing_cycle_start: string;
  billing_cycle_end: string;
  total_charges: string;
  total_paper: string;
  total_color_pages: string;
  total_bw_pages: string;
  color_pages_charge: string;
  bw_pages_charge: string;
};

export type Payment = {
  id: string;
  billing_id: string;
  payment_date: string;
  amount_paid: string;
  payment_status: string;
};
