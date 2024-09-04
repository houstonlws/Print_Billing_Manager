package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.Invoice;
import com.houstonlewis.PrintBillMaster.services.BillingService;
import com.houstonlewis.PrintBillMaster.utilities.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/protected")
public class BillingController {

    private static final Logger logger = LoggerFactory.getLogger(BillingController.class);

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping({"/billing/history/{id}", "/billing/history"})
    public ResponseEntity<List<Invoice>> getDepartmentInvoiceHistory(@PathVariable(required = false) String id) {
        logger.info("getting invoices: " + id);
        List<Invoice> invoices = billingService.getDepartmentInvoiceHistory(id);
        if (invoices == null) {
            logger.warning("problem getting invoice data");
            return ResponseEntity.badRequest().body(null);
        }
        logger.info("got invoices");
        return ResponseEntity.ok(invoices);
    }

    @GetMapping("/billing/current/{id}")
    public ResponseEntity<Invoice> getCurrentInvoice(@PathVariable(required = false) String id) {
        logger.info("getting current invoice");
        Invoice invoice = billingService.getCurrentInvoice(id);
        if (invoice == null) {
            logger.warning("problem getting current invoice");
            return ResponseEntity.badRequest().body(null);
        }
        logger.info("got current invoice");
        return ResponseEntity.ok(invoice);
    }

}
