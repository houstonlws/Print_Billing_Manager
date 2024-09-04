package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.MaintenanceRequest;
import com.houstonlewis.PrintBillMaster.services.MaintenanceService;
import com.houstonlewis.PrintBillMaster.utilities.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/protected")
public class MaintenanceController {

    private static final Logger logger = LoggerFactory.getLogger(MaintenanceController.class);

    private final MaintenanceService maintenanceService;

    public MaintenanceController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @GetMapping({"/maintenance", "/maintenance/{id}"})
    public ResponseEntity<List<MaintenanceRequest>> getMaintenanceRequests(@PathVariable(required = false) String id) {
        logger.info("getting maintenance requests");
        List<MaintenanceRequest> requests = maintenanceService.getMaintenanceRequests(id);
        if (requests == null) {
            logger.warning("problem getting requests");
            return ResponseEntity.badRequest().body(null);
        }
        logger.info("got requests successfully");
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/maintenance")
    public ResponseEntity<String> addMaintenanceRequest(@RequestBody MaintenanceRequest request) {
        logger.info("adding maintenance request");
        boolean added = maintenanceService.addMaintenanceRequest(request);
        if (added) {
            logger.info("maintenance request added");
            return ResponseEntity.ok("Added request");
        }
        logger.warning("problem adding maintenance request");
        return ResponseEntity.badRequest().body("Didn't add request");
    }

    @PatchMapping("/maintenance/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable String id, @RequestBody String status) {
        logger.info("updating maintenance request");
        boolean updated = maintenanceService.updateStatus(id, status);
        if (updated) {
            logger.info("updated request");
            return ResponseEntity.ok("Updated request");
        }
        logger.warning("problem updating request");
        return ResponseEntity.badRequest().body("Didn't update request");
    }

}
