package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.PriceProfile;
import com.houstonlewis.PrintBillMaster.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/protected/app")
public class AppController {

    @Autowired
    AppService appService;

    @PatchMapping("/priceProfile/set/{id}")
    public ResponseEntity setPriceProfile(@PathVariable String id) {
        System.out.println("Setting price profile");
        boolean set = appService.setPriceProfile(id);
        if (set) return ResponseEntity.ok("Profile set successfully");
        else return ResponseEntity.badRequest().body("Price profile not set");
    }

    @PostMapping("/priceProfile/add")
    public ResponseEntity addPriceProfile(@RequestBody PriceProfile profile) {
        boolean added = appService.addPriceProfile(profile);
        if (added) return ResponseEntity.ok("Profile added");
        else return ResponseEntity.badRequest().body("Profile not added");
    }

    @PatchMapping("/priceProfile/update")
    public ResponseEntity updatePriceProfile(@RequestBody PriceProfile profile) {
        boolean updated = appService.updatePriceProfile(profile);
        if (updated) return ResponseEntity.ok("Profile updated");
        else return ResponseEntity.badRequest().body("Profile not updated");
    }
}
