package com.houstonlewis.PrintBillMaster.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.houstonlewis.PrintBillMaster.dao.AuthDAO;
import com.houstonlewis.PrintBillMaster.models.app.PriceProfile;
import com.houstonlewis.PrintBillMaster.models.auth.Notification;
import com.houstonlewis.PrintBillMaster.models.auth.User;
import com.houstonlewis.PrintBillMaster.models.billing.Bill;
import com.houstonlewis.PrintBillMaster.models.dto.Source;
import com.houstonlewis.PrintBillMaster.models.maintenance.MaintenanceRequest;
import com.houstonlewis.PrintBillMaster.models.printer.Metric;
import com.houstonlewis.PrintBillMaster.models.printer.Printer;
import com.houstonlewis.PrintBillMaster.models.tracking.Job;
import com.houstonlewis.PrintBillMaster.utilities.JWTUtility;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    AuthDAO authDAO;

    public User login(User user) {
        String id = authDAO.validateLoginInfo(user.getEmail(), user.getPassword());
        User data = authDAO.getUserData(id);
        return data;
    }

    public boolean register(User user) {
        boolean registered = authDAO.addLoginInfo(user.getEmail(), user.getPassword());
        if (registered) {
            String id = authDAO.validateLoginInfo(user.getEmail(), user.getPassword());
            user.setId(id);
            return authDAO.addUserInfo(user);
        }
        return false;
    }

    public String validateToken(String token) {
        try {
            return JWTUtility.decrypt(token);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public String getAccessToken(User user) {
        user = authDAO.getUserData(user.getId());
        return JWTUtility.createAccessToken(user.toString());
    }

    public String getRefreshToken(User user) {
        user = authDAO.getUserData(user.getId());
        return JWTUtility.createRefreshToken(user.toString());
    }

    public HttpHeaders getHeaders(String accessToken, String refreshToken) {
        return JWTUtility.getHeaders(accessToken, refreshToken);
    }

    public User getUserData(String id) {
        return authDAO.getUserData(id);
    }

    public boolean updateUserData(String id, User user) {
        return authDAO.updateUserData(id, user);
    }

    public List<Notification> getNotifications(String id) {
        return authDAO.getNotifications(id);

    }

    public List<User> getAllUsers() {
        return authDAO.getAllUsers();
    }

    public boolean changeUserType(String[] list) {
        return authDAO.changeUserType(list);
    }

    public Map<String, List<Object>> getAllData(String id) {
        List<Source> sources = authDAO.getAllData(id);
        Map<String, List<Object>> payload = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Class<?>> classMap = new HashMap<>() {{
            put("billing", Bill.class);
            put("department_metrics", Metric.class);
            put("jobs", Job.class);
            put("maintenance_requests", MaintenanceRequest.class);
            put("notifications", Notification.class);
            put("price", PriceProfile.class);
            put("prices", PriceProfile.class);
            put("printers", Printer.class);
            put("users", User.class);
        }};

        if (sources != null)
            for (Source source : sources) {
                String name = source.getSource();
                String data = source.getData();
                JSONArray arr = new JSONArray(data);
                int len = arr.length() - 1;
                while (len > 0) {
                    payload.computeIfAbsent(name, val -> new ArrayList<>());
                    try {
                        payload.get(name)
                                .add(mapper.readValue(arr.get(len).toString(), classMap.get(name)));
                    } catch (JsonProcessingException e) {
                        System.out.println(e.getMessage());
                    }
                    len--;
                }
            }

        return payload;
    }


}
