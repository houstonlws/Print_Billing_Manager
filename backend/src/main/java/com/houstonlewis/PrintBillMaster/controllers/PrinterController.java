package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.Metric;
import com.houstonlewis.PrintBillMaster.models.Printer;
import com.houstonlewis.PrintBillMaster.services.PrinterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/protected")
public class PrinterController {

    @Autowired
    PrinterService printerService;

    @GetMapping({"/printer/metrics", "/printer/metrics/{id}"})
    public ResponseEntity<List<Metric>> getMetrics(@PathVariable(required = false) String id) {
        System.out.println("getting metrics");
        List<Metric> metrics = printerService.getMetrics(id);
        if (metrics == null) {
            System.out.println("problem getting metrics");
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println("got metrics successfully");
        return ResponseEntity.ok(metrics);
    }

    @GetMapping({"/printer/get", "/printer/{id}"})
    public ResponseEntity<List<Printer>> getPrinters(@PathVariable(name = "id", required = false) String id) {
        System.out.println("getting printers");
        List<Printer> printers = printerService.getPrinters(id);
        if (printers == null) {
            System.out.println("problem getting printers");
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println("got printers successfully");
        return ResponseEntity.ok(printers);
    }

    @PatchMapping("/printer/{id}")
    public ResponseEntity<String> updatePrinter(@PathVariable String id, @RequestBody Printer printer) {
        System.out.println("updating printer: " + id);
        boolean updated = printerService.updatePrinter(printer);
        if (!updated) {
            System.out.println("problem updating printer");
            return ResponseEntity.badRequest().body("didn't update printer");
        }
        System.out.println("updated printer");
        return ResponseEntity.ok("Updated printer");
    }

    @PostMapping("/printer")
    public ResponseEntity<String> addPrinter(@RequestBody Printer printer) {
        System.out.println("adding printer");
        boolean added = printerService.addPrinter(printer);
        if (added) {
            System.out.println("added printer");
            return ResponseEntity.ok("Added printer");
        }
        System.out.println("problem adding printer");
        return ResponseEntity.badRequest().body("Didn't add pinter");
    }

}
