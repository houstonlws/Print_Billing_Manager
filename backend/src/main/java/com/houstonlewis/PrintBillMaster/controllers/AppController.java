package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.PriceProfile;
import com.houstonlewis.PrintBillMaster.services.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/protected/app")
public class AppController {

    @Autowired
    AppService appService;

    @GetMapping("/priceProfile")
    public ResponseEntity<PriceProfile> getPriceProfile() {
        System.out.println("Getting active price profile");
        PriceProfile pp = appService.getPriceProfile();
        if (pp == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(pp);
    }

    @GetMapping("/priceProfile/list")
    public ResponseEntity<List<PriceProfile>> getPriceProfileList() {
        System.out.println("Getting active price profile");
        List<PriceProfile> list = appService.getPriceProfileList();
        if (list == null) return ResponseEntity.badRequest().body(null);
        return ResponseEntity.ok(list);
    }

    @PatchMapping("/priceProfile/{id}")
    public ResponseEntity<String> setPriceProfile(@PathVariable String id) {
        System.out.println("Setting price profile");
        boolean set = appService.setPriceProfile(id);
        if (set) return ResponseEntity.ok("Profile set successfully");
        else return ResponseEntity.badRequest().body("Price profile not set");
    }

    @PostMapping("/priceProfile")
    public ResponseEntity<String> addPriceProfile(@RequestBody PriceProfile profile) {
        boolean added = appService.addPriceProfile(profile);
        if (added) return ResponseEntity.ok("Profile added");
        else return ResponseEntity.badRequest().body("Profile not added");
    }

    @PatchMapping("/priceProfile")
    public ResponseEntity<String> updatePriceProfile(@RequestBody PriceProfile profile) {
        boolean updated = appService.updatePriceProfile(profile);
        if (updated) return ResponseEntity.ok("Profile updated");
        else return ResponseEntity.badRequest().body("Profile not updated");
    }
}
