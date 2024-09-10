package com.houstonlewis.PrintBillMaster.controllers;

import com.houstonlewis.PrintBillMaster.models.Notification;
import com.houstonlewis.PrintBillMaster.models.User;
import com.houstonlewis.PrintBillMaster.services.AccountService;
import com.houstonlewis.PrintBillMaster.utilities.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Controller()
@RequestMapping("/protected/account")
public class AccountController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Object> getUserData(@PathVariable String id) {
        if (id.equalsIgnoreCase("*")) {
            logger.info("Getting all user data");
            List<User> users = accountService.getAllUsers();
            if (users == null) {
                logger.warning("problem getting users");
                return ResponseEntity.badRequest().body("Didn't get users");
            }
            logger.info("got users successfully");
            return ResponseEntity.ok(users);
        } else {
            logger.info("getting user data for user id: " + id);
            User user = accountService.getUserData(id);
            if (user == null) {
                logger.warning("problem getting user data");
                return ResponseEntity.badRequest().body("Didn't get data");
            }
            logger.info("got user data successfully");
            return ResponseEntity.ok(user);
        }
    }

    @PatchMapping("/user/{id}")
    public ResponseEntity<User> updateUserData(@PathVariable String id, @RequestBody User data) {
        logger.info("updating user data - id: " + id);
        boolean updated = accountService.updateUserData(id, data);
        if (updated) {
            logger.info("user data updated");
            return ResponseEntity.ok().body(data);
        }
        logger.warning("problem updating user data");
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping({"/notifications", "/notifications/{id}"})
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable(required = false) String id) {
        logger.info("getting notifications");
        List<Notification> notifications = accountService.getNotifications(id);
        if (notifications == null) {
            logger.warning("problem getting notifications");
            return ResponseEntity.badRequest().body(null);
        }
        logger.info("got notifications successfully");
        return ResponseEntity.ok(notifications);
    }

    @GetMapping({"/notifications/unread", "/notifications/{id}/unread"})
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable(required = false) String id) {
        logger.info("getting notifications");
        List<Notification> notifications = accountService.getUnreadNotifications(id);
        if (notifications == null) {
            logger.warning("problem getting notifications");
            return ResponseEntity.badRequest().body(null);
        }
        logger.info("got notifications successfully");
        return ResponseEntity.ok(notifications);
    }

    @PatchMapping("/user/type")
    public ResponseEntity<String> changeUserType(@RequestBody String[] users) {
        logger.info("Updating user type(s)");
        boolean changed = accountService.changeUserType(users);
        if (changed) {
            logger.info("updated user type(s)");
            return ResponseEntity.ok("User types changed");
        } else {
            logger.warning("problem updating user type(s)");
            return ResponseEntity.badRequest().body("User types not changed");
        }
    }

    @GetMapping({"/getAllData", "/getAllData/{id}"})
    public ResponseEntity<Object> getAllData(@PathVariable(required = false) String id) {
        logger.info("getting all data");
        Map<String, List<Object>> payload = accountService.getAllData(id);
        return ResponseEntity.ok(payload);
    }
}

