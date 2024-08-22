package com.houstonlewis.PrintBillMaster.services;

import com.houstonlewis.PrintBillMaster.dao.BillingDAO;
import com.houstonlewis.PrintBillMaster.models.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillingDAO billingDAO;

    public List<Bill> getDepartmentBilling(String id) {
        return billingDAO.getDepartmentBilling(id);
    }

}
