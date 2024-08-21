package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.tracking.Job;
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

    @GetMapping({"/jobHistory/get", "/jobHistory/get/{id}"})
    public ResponseEntity getJobHistory(@PathVariable(required = false) String id) {
        System.out.println("getting job history");
        Map<String, Map<String, List<Object>>> jobs = trackingService.getJobHistory(id);
        if (jobs == null) {
            System.out.println("problem getting jobs");
            return ResponseEntity.badRequest().body("Didn't get jobs");
        }
        System.out.println("got jobs");
        return ResponseEntity.ok(jobs);
    }

    @GetMapping({"/currentJobs/get", "/currentJobs/get/{id}"})
    public ResponseEntity getCurrentJobs(@PathVariable(required = false) String id) {
        System.out.println("getting current jobs");
        List<Job> jobs = trackingService.getCurrentJobs(id);
        if (jobs == null) {
            System.out.println("problem getting jobs");
            return ResponseEntity.badRequest().body("Didn't get jobs");
        }
        System.out.println("got jobs");
        return ResponseEntity.ok(jobs);
    }

}
