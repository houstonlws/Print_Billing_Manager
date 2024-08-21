package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.billing.Bill;

import java.util.List;

public interface BillingDAO {

    List<Bill> getDepartmentBilling(String id);

}
