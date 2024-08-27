package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.Invoice;
import com.houstonlewis.PrintBillMaster.services.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/protected")
public class BillingController {

    @Autowired
    BillingService billingService;

    @GetMapping({"/billing/history/{id}", "/billing/history"})
    public ResponseEntity<List<Invoice>> getDepartmentInvoiceHistory(@PathVariable(required = false) String id) {
        System.out.println("getting invoices: " + id);
        List<Invoice> invoices = billingService.getDepartmentInvoiceHistory(id);
        if (invoices == null) {
            System.out.println("problem getting invoice data");
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println("got invoices");
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/billing/current/{id}")
    public ResponseEntity<Invoice> getCurrentInvoice(@PathVariable(required = false) String id) {
        System.out.println("getting current invoice");
        Invoice invoice = billingService.getCurrentInvoice(id);
        if (invoice == null) {
            System.out.println("problem getting current invoice");
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println("got current invoice");
        return ResponseEntity.ok(invoice);
    }

}
