package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.billing.Bill;
import com.houstonlewis.PrintBillMaster.services.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/protected/billing")
public class BillingController {

    @Autowired
    BillingService billingService;

    @GetMapping("/get/{id}")
    public ResponseEntity getDepartmentBilling(@PathVariable String id) {
        System.out.println("getting bills");
        List<Bill> bills = billingService.getDepartmentBilling(id);
        if (bills == null) {
            System.out.println("problem getting bill data");
            return ResponseEntity.badRequest().body("Didn't get bills");
        }
        System.out.println("got bills");
        return ResponseEntity.ok(bills);
    }

}
