package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.PriceProfile;
import com.houstonlewis.PrintBillMaster.services.AppService;
import com.houstonlewis.PrintBillMaster.utilities.LoggerFactory;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/protected/app")
public class AppController {

    private final static Logger logger = LoggerFactory.getLogger(AppController.class);
    private final AppService appService;

    public AppController(HttpServletRequest request, AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/priceProfile")
    public ResponseEntity<PriceProfile> getPriceProfile() {
        logger.info("Getting active price profile");
        PriceProfile pp = appService.getPriceProfile();
        if (pp == null) {
            logger.warning("problem getting price profile");
            return ResponseEntity.badRequest().body(null);
        }
        logger.info("got price profile");
        return ResponseEntity.ok(pp);
    }

    @GetMapping("/priceProfile/list")
    public ResponseEntity<List<PriceProfile>> getPriceProfileList() {
        logger.info("Getting price profiles list");
        List<PriceProfile> list = appService.getPriceProfileList();
        if (list == null) {
            logger.warning("problem getting profiles list");
            return ResponseEntity.badRequest().body(null);
        }
        logger.info("got price profiles");
        return ResponseEntity.ok(list);
    }

    @PatchMapping("/priceProfile/{id}")
    public ResponseEntity<String> setPriceProfile(@PathVariable String id) {
        logger.info("Setting price profile");
        boolean set = appService.setPriceProfile(id);
        if (set) {
            logger.info("set price profile");
            return ResponseEntity.ok("Profile set successfully");
        }
        logger.warning("problem setting price profile");
        return ResponseEntity.badRequest().body("Price profile not set");
    }

    @PostMapping("/priceProfile")
    public ResponseEntity<String> addPriceProfile(@RequestBody PriceProfile profile) {
        logger.info("Adding price profile");
        boolean added = appService.addPriceProfile(profile);
        if (added) {
            logger.info("Added price profile");
            return ResponseEntity.ok("Profile added");
        }
        logger.warning("Problem adding price profile");
        return ResponseEntity.badRequest().body("Profile not added");
    }

    // TODO - remove
    @PatchMapping("/priceProfile")
    public ResponseEntity<String> updatePriceProfile(@RequestBody PriceProfile profile) {
        boolean updated = appService.updatePriceProfile(profile);
        if (updated) return ResponseEntity.ok("Profile updated");
        else return ResponseEntity.badRequest().body("Profile not updated");
    }
}
