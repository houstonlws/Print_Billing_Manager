package com.houstonlewis.PrintBillMaster.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.houstonlewis.PrintBillMaster.dao.AccountDAO;
import com.houstonlewis.PrintBillMaster.models.*;
import org.json.JSONArray;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Service
public class AccountService {

    private static final Logger logger = Logger.getLogger(AuthService.class.getName());

    private final AccountDAO accountDAO;

    public AccountService(AccountDAO accountDAO) {
        this.accountDAO = accountDAO;
    }

    public User getUserData(String id) {
        return accountDAO.getUserData(id);
    }

    public boolean updateUserData(String id, User user) {
        return accountDAO.updateUserData(id, user);
    }

    public List<Notification> getNotifications(String id) {
        return accountDAO.getNotifications(id);
    }

    public List<Notification> getUnreadNotifications(String id) {
        return accountDAO.getUnreadNotifications(id);
    }

    public List<User> getAllUsers() {
        return accountDAO.getAllUsers();
    }

    public boolean changeUserType(String[] list) {
        return accountDAO.changeUserType(list);
    }

    public Map<String, List<Object>> getAllData(String id) {
        List<Source> sources = accountDAO.getAllData(id);
        Map<String, List<Object>> payload = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Class<?>> classMap = new HashMap<>() {{
            put("billing", Bill.class);
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
                        logger.severe(e.getMessage());
                    }
                    len--;
                }
            }

        return payload;
    }
}
