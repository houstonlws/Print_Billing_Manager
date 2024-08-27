package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Bill;
import com.houstonlewis.PrintBillMaster.models.Invoice;

import java.util.List;

public interface BillingDAO {

    List<Bill> getDepartmentBilling(String id);

    List<Invoice> getDepartmentInvoiceHistory(String id);

    Invoice getCurrentInvoice(String id);

}
