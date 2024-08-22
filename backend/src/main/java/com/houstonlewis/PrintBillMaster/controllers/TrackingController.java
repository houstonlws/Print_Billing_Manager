package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.Job;
import com.houstonlewis.PrintBillMaster.models.Totals;
import com.houstonlewis.PrintBillMaster.services.TrackingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/protected/tracking")
public class TrackingController {

    @Autowired
    TrackingService trackingService;

    @GetMapping({"/jobHistory", "/jobHistory/{id}"})
    public ResponseEntity<Object> getJobHistory(@PathVariable(required = false) String id) {
        System.out.println("getting job history");
        Map<String, Map<String, List<Object>>> jobs = trackingService.getJobHistory(id);
        if (jobs == null) {
            System.out.println("problem getting jobs");
            return ResponseEntity.badRequest().body("Didn't get jobs");
        }
        System.out.println("got jobs");
        return ResponseEntity.ok(jobs);
    }

    @GetMapping({"/currentJobs", "/currentJobs/{id}"})
    public ResponseEntity<Object> getCurrentJobs(@PathVariable(required = false) String id) {
        System.out.println("getting current jobs");
        List<Job> jobs = trackingService.getCurrentJobs(id);
        if (jobs == null) {
            System.out.println("problem getting jobs");
            return ResponseEntity.badRequest().body("Didn't get jobs");
        }
        System.out.println("got jobs");
        return ResponseEntity.ok(jobs);
    }

    @GetMapping({"/currentJobs/totals", "/currentJobs/totals/{id}"})
    public ResponseEntity<Object> getCurrentJobsTotals(@PathVariable(required = false) String id) {
        System.out.println("getting current totals");
        Totals totals = trackingService.getCurrentTotals(id);
        if (totals == null) {
            System.out.println("problem getting current totals");
            return ResponseEntity.badRequest().body("Didn't get current totals");
        }
        System.out.println("got current totals");
        return ResponseEntity.ok(totals);
    }

    @GetMapping("/jobHistory/totals")
    public ResponseEntity<Object> getJobHistoryTotals(@PathVariable(required = false) String id) {
        System.out.println("getting job history totals");
        List<Job> jobs = trackingService.getCurrentJobs(id);
        if (jobs == null) {
            System.out.println("problem getting jobs");
            return ResponseEntity.badRequest().body("Didn't get jobs");
        }
        System.out.println("got jobs");
        return ResponseEntity.ok(jobs);
    }

}
