package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.BillingPeriod;
import com.houstonlewis.PrintBillMaster.models.Job;
import com.houstonlewis.PrintBillMaster.models.Totals;
import com.houstonlewis.PrintBillMaster.services.TrackingService;
import com.houstonlewis.PrintBillMaster.utilities.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/protected/tracking")
public class TrackingController {

    private static final Logger logger = LoggerFactory.getLogger(TrackingController.class);

    private final TrackingService trackingService;

    public TrackingController(TrackingService trackingService) {
        this.trackingService = trackingService;
    }

    @GetMapping({"/jobHistory", "/jobHistory/{id}"})
    public ResponseEntity<Object> getJobHistory(@PathVariable(required = false) String id) {
        logger.info("getting job history");
        Map<String, Map<String, List<Object>>> jobs = trackingService.getJobHistory(id);
        if (jobs == null) {
            logger.warning("problem getting jobs");
            return ResponseEntity.badRequest().body("Didn't get jobs");
        }
        logger.info("got jobs");
        return ResponseEntity.ok(jobs);
    }

    @GetMapping({"/currentJobs", "/currentJobs/{id}"})
    public ResponseEntity<Object> getCurrentJobs(@PathVariable(required = false) String id) {
        logger.info("getting current jobs");
        List<Job> jobs = trackingService.getCurrentJobs(id);
        if (jobs == null) {
            logger.warning("problem getting jobs");
            return ResponseEntity.badRequest().body("Didn't get jobs");
        }
        logger.info("got jobs");
        return ResponseEntity.ok(jobs);
    }

    @GetMapping({"/currentJobs/totals", "/currentJobs/totals/{id}"})
    public ResponseEntity<Object> getCurrentJobsTotals(@PathVariable(required = false) String id) {
        logger.info("getting current totals");
        Totals totals = trackingService.getCurrentTotals(id);
        if (totals == null) {
            logger.warning("problem getting current totals");
            return ResponseEntity.badRequest().body("Didn't get current totals");
        }
        logger.info("got current totals");
        return ResponseEntity.ok(totals);
    }

    @GetMapping("/jobHistory/totals")
    public ResponseEntity<Object> getJobHistoryTotals(@PathVariable(required = false) String id) {
        logger.info("getting job history totals");
        List<Job> jobs = trackingService.getCurrentJobs(id);
        if (jobs == null) {
            logger.warning("problem getting jobs");
            return ResponseEntity.badRequest().body("Didn't get jobs");
        }
        logger.info("got jobs");
        return ResponseEntity.ok(jobs);
    }

    @GetMapping({"/billingPeriods", "/billingPeriods/{id}"})
    public ResponseEntity<List<BillingPeriod>> getBillingPeriods(@PathVariable(required = false) String id) {
        logger.info(String.format("Getting billing periods for id: %s", id));
        List<BillingPeriod> billingPeriods = trackingService.getBillingPeriods(id);
        if (billingPeriods != null) {
            logger.info("Got billing periods successfully");
            return ResponseEntity.ok(billingPeriods);
        } else {
            logger.warning("Problem getting billing periods");
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping({"/billingPeriods/current"})
    public ResponseEntity<BillingPeriod> getCurrentBillingPeriod() {
        logger.info("Getting current billing period");
        BillingPeriod billingPeriod = trackingService.getCurrentBillingPeriod();
        if (billingPeriod != null) {
            logger.info("Got current billing period successfully");
            return ResponseEntity.ok(billingPeriod);
        } else {
            logger.warning("Problem getting current billing period");
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping({"/jobs"})
    public ResponseEntity<List<Job>> getJobsByBillingPeriod(
            @RequestParam(name = "depId", required = false) String depId,
            @RequestParam(name = "bpId") String bpId) {
        logger.info(String.format("Getting jobs for billing period: %s", bpId));
        List<Job> jobs = trackingService.getJobsByBillingPeriod(depId, bpId);
        if (jobs != null) {
            logger.info("Got jobs successfully");
            return ResponseEntity.ok(jobs);
        } else {
            logger.warning("Problem getting jobs");
            return ResponseEntity.badRequest().body(null);
        }
    }

}
