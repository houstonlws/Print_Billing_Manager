package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.MaintenanceRequest;
import com.houstonlewis.PrintBillMaster.services.MaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/protected")
public class MaintenanceController {

    @Autowired
    MaintenanceService maintenanceService;

    @GetMapping({"/maintenance", "/maintenance/{id}"})
    public ResponseEntity<List<MaintenanceRequest>> getMaintenanceRequests(@PathVariable(required = false) String id) {
        System.out.println("getting maintenance requests");
        List<MaintenanceRequest> requests = maintenanceService.getMaintenanceRequests(id);
        if (requests == null) {
            System.out.println("problem getting requests");
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println("got requests successfully");
        return ResponseEntity.ok(requests);
    }

    @PostMapping("/maintenance")
    public ResponseEntity<String> addMaintenanceRequest(@RequestBody MaintenanceRequest request) {
        System.out.println("adding maintenance request");
        boolean added = maintenanceService.addMaintenanceRequest(request);
        if (added) {
            System.out.println("maintenance request added");
            return ResponseEntity.ok("Added request");
        }
        System.out.println("problem adding maintenance request");
        return ResponseEntity.badRequest().body("Didn't add request");
    }

    @PatchMapping("/maintenance/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable String id, @RequestBody String status) {
        System.out.println("updating maintenance request");
        boolean updated = maintenanceService.updateStatus(id, status);
        if (updated) {
            System.out.println("updated request");
            return ResponseEntity.ok("Updated request");
        }
        System.out.println("problem updating request");
        return ResponseEntity.badRequest().body("Didn't update request");
    }

}
