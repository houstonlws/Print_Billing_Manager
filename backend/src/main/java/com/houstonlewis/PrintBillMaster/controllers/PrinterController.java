package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.Printer;
import com.houstonlewis.PrintBillMaster.services.PrinterService;
import com.houstonlewis.PrintBillMaster.utilities.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/protected")
public class PrinterController {

    private static final Logger logger = LoggerFactory.getLogger(PrinterController.class);

    private final PrinterService printerService;

    public PrinterController(PrinterService printerService) {
        this.printerService = printerService;
    }

    @GetMapping({"/printer/get", "/printer/{id}"})
    public ResponseEntity<List<Printer>> getPrinters(@PathVariable(name = "id", required = false) String id) {
        logger.info("getting printers");
        List<Printer> printers = printerService.getPrinters(id);
        if (printers == null) {
            logger.warning("problem getting printers");
            return ResponseEntity.badRequest().body(null);
        }
        logger.info("got printers successfully");
        return ResponseEntity.ok(printers);
    }

    @PatchMapping("/printer/{id}")
    public ResponseEntity<String> updatePrinter(@PathVariable String id, @RequestBody Printer printer) {
        logger.info("updating printer: " + id);
        boolean updated = printerService.updatePrinter(printer);
        if (!updated) {
            logger.warning("problem updating printer");
            return ResponseEntity.badRequest().body("didn't update printer");
        }
        logger.info("updated printer");
        return ResponseEntity.ok("Updated printer");
    }

    @PostMapping("/printer")
    public ResponseEntity<String> addPrinter(@RequestBody Printer printer) {
        logger.info("adding printer");
        boolean added = printerService.addPrinter(printer);
        if (added) {
            logger.info("added printer");
            return ResponseEntity.ok("Added printer");
        }
        logger.warning("problem adding printer");
        return ResponseEntity.badRequest().body("Didn't add pinter");
    }

}
