package com.houstonlewis.PrintBillMaster.controllers;


import com.houstonlewis.PrintBillMaster.models.Notification;
import com.houstonlewis.PrintBillMaster.models.User;
import com.houstonlewis.PrintBillMaster.services.AuthService;
import com.houstonlewis.PrintBillMaster.utilities.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping()
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        logger.info("logging in user");
        User data = authService.login(user);
        if (data != null) {
            logger.info("login success");
            String access = authService.getAccessToken(data);
            String refresh = authService.getRefreshToken(data);
            HttpHeaders headers = authService.getHeaders(access, refresh);
            return ResponseEntity.ok().headers(headers).body(data);
        } else {
            logger.warning("login failure");
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        logger.info("registering");
        boolean registered = authService.register(user);
        if (registered) {
            logger.info("register success");
            return ResponseEntity.ok("User registered");
        } else {
            logger.warning("register failure");
            return ResponseEntity.badRequest().body("User not registered");
        }
    }

    @GetMapping("/refreshToken")
    public ResponseEntity<User> refreshToken(@RequestHeader(value = "Authorization") String accessToken, @CookieValue(value = "refreshToken") String refreshToken) {
        logger.info("refreshing token");
        String decryptedAccess = authService.validateToken(accessToken);
        if (decryptedAccess != null) {
            logger.info("token refreshed");
            User user = User.fromString(decryptedAccess);
            String access = authService.getAccessToken(user);
            HttpHeaders headers = authService.getHeaders(access, refreshToken);
            return ResponseEntity.ok().headers(headers).body(user);
        } else {
            String decryptedRefresh = authService.validateToken(refreshToken);
            if (decryptedRefresh != null) {
                logger.info("token refreshed");
                User user = User.fromString(decryptedRefresh);
                String access = authService.getAccessToken(user);
                HttpHeaders headers = authService.getHeaders(access, refreshToken);
                return ResponseEntity.ok().headers(headers).body(user);
            } else {
                logger.warning("token invalid");
                return ResponseEntity.badRequest().body(null);
            }
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Object> getUserData(@PathVariable String id) {
        if (id.equalsIgnoreCase("*")) {
            logger.info("Getting all user data");
            List<User> users = authService.getAllUsers();
            if (users == null) {
                logger.warning("problem getting users");
                return ResponseEntity.badRequest().body("Didn't get users");
            }
            logger.info("got users successfully");
            return ResponseEntity.ok(users);
        } else {
            logger.info("getting user data for user id: " + id);
            User user = authService.getUserData(id);
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
        boolean updated = authService.updateUserData(id, data);
        if (updated) {
            logger.info("user data updated");
            return ResponseEntity.ok().body(data);
        }
        logger.warning("problem updating user data");
        return ResponseEntity.badRequest().body(null);
    }

    @GetMapping("/notifications/{id}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable String id) {
        logger.info("getting notifications");
        List<Notification> notifications = authService.getNotifications(id);
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
        boolean changed = authService.changeUserType(users);
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
        Map<String, List<Object>> payload = authService.getAllData(id);
        return ResponseEntity.ok(payload);
    }

}
