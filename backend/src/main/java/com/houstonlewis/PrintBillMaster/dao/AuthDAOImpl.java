package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Notification;
import com.houstonlewis.PrintBillMaster.models.Source;
import com.houstonlewis.PrintBillMaster.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class AuthDAOImpl implements AuthDAO {

    private final RowMapper<User> userMapper = (rs, rowNum) -> new User(
            getString(rs, "id"),
            getString(rs, "email"),
            getString(rs, "type"),
            "",
            getString(rs, "firstName"),
            getString(rs, "lastName"),
            getString(rs, "department_id"),
            getString(rs, "phone")
    );

    private final RowMapper<Notification> notificationMapper = (rs, rowNum) -> new Notification(
            getString(rs, "id"),
            getString(rs, "department_id"),
            getString(rs, "maintenance_id"),
            getString(rs, "notification_date"),
            getString(rs, "message"),
            getString(rs, "is_read")
    );

    private final RowMapper<Source> sourceMapper = (rs, rowNum) -> new Source(
            getString(rs, "source"),
            getString(rs, "data")
    );

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public boolean addLoginInfo(String email, String password) {
        try {
            String stmt = "INSERT INTO auth (email, password) VALUES (?,?)";
            int added = jdbcTemplate.update(stmt, email, password);
            return added != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean addUserInfo(User user) {
        try {
            String stmt = "INSERT INTO users (id, email, type) VALUES (?,?,'USER')";
            int added = jdbcTemplate.update(stmt, user.getId(), user.getEmail());
            return added != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public String validateLoginInfo(String email, String password) {
        try {
            List<String> params = new ArrayList<>();
            params.add(email);
            params.add(password);
            String query = "SELECT id FROM auth WHERE email=? AND password=?";
            List<User> users = jdbcTemplate.query(query, userMapper, params.toArray());
            return users.get(0).getId();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "";
        }
    }

    @Override
    public User getUserData(String id) {
        try {
            String query = "SELECT * FROM users WHERE id=?";
            List<User> users = jdbcTemplate.query(query, userMapper, id);
            return users.get(0);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean updateUserData(String id, User user) {
        try {
            String stmt = "UPDATE users SET firstName=?, lastName=?, department_id=?, email=?, phone=? WHERE id=?";
            int added = jdbcTemplate.update(stmt, user.getFirstName(), user.getLastName(), user.getDepartment_id(), user.getEmail(), user.getPhone(), id);
            return added != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public List<Notification> getNotifications(String id) {
        try {
            String query = "SELECT id, department_id, maintenance_id, " +
                    "DATE_FORMAT(notification_date, '%Y-%m-%d') as notification_date, " +
                    "message, is_read FROM notifications WHERE " +
                    (id == "0" ? "maintenance_id IS NOT NULL" : "department_id=?");
            List<Notification> notifications = jdbcTemplate.query(query, notificationMapper, id);
            return notifications;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public List<User> getAllUsers() {
        try {
            String query = "SELECT * FROM users";
            List<User> users = jdbcTemplate.query(query, userMapper);
            return users;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean changeUserType(String[] userIds) {
        try {
            String stmt = "UPDATE users SET type = (CASE " +
                    "WHEN type = 'ADMIN' THEN 'USER'" +
                    "WHEN type = 'USER' THEN 'ADMIN' " +
                    "END) WHERE id IN (" + String.join(",", userIds) + ")";
            int changed = jdbcTemplate.update(stmt);
            return changed != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public List<Source> getAllData(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null)
                for (int i = 0; i < 5; i++)
                    params.add(id);

            String query = "SELECT source, JSON_ARRAYAGG(data) AS data \n" +
                    "      FROM (SELECT 'notifications' AS source,\n" +
                    "      JSON_OBJECT(\n" +
                    "        'id', id,\n" +
                    "        'department_id', department_id,\n" +
                    "        'maintenance_id', maintenance_id,\n" +
                    "        'notification_date', DATE_FORMAT(notification_date, '%Y-%m-%d'),\n" +
                    "        'message', message,\n" +
                    "        'is_read', is_read\n" +
                    "      ) AS data\n" +
                    "      FROM notifications\n" +
                    (id != null ? " WHERE department_id=? \n" : "WHERE maintenance_id IS NOT NULL \n") +
                    "      UNION ALL SELECT \n" +
                    "      'printers' AS source,\n" +
                    "      JSON_OBJECT(\n" +
                    "        'id', id,\n" +
                    "        'department_id', department_id,\n" +
                    "        'serial_number', serial_number,\n" +
                    "        'model', model,\n" +
                    "        'brand', brand,\n" +
                    "        'location', location,\n" +
                    "        'installation_date', DATE_FORMAT(installation_date, '%Y-%m-%d'),\n" +
                    "        'warranty_expiry_date', DATE_FORMAT(warranty_expiry_date, '%Y-%m-%d'),\n" +
                    "        'ip_address', ip_address,\n" +
                    "        'mac_address', mac_address,\n" +
                    "        'firmware_version', firmware_version\n" +
                    "      ) AS data \n" +
                    "      FROM printers\n" +
                    (id != null ? " WHERE department_id=? " : " \n") +
                    "      UNION ALL SELECT \n" +
                    "      'maintenance_requests' AS source,\n" +
                    "      JSON_OBJECT(\n" +
                    "        'id', id,\n" +
                    "        'department_id', department_id,\n" +
                    "        'printer_id', printer_id,\n" +
                    "        'request_date', DATE_FORMAT(request_date, '%Y-%m-%d'),\n" +
                    "        'maintenance_type', maintenance_type,\n" +
                    "        'description', description,\n" +
                    "        'status', status,\n" +
                    "        'resolved_date', DATE_FORMAT(resolved_date, '%Y-%m-%d')\n" +
                    "      ) AS data\n" +
                    "      FROM maintenance_requests\n" +
                    (id != null ? " WHERE department_id=? \n" : " \n") +
                    "      UNION ALL SELECT\n" +
                    "      'jobs' as source,\n" +
                    "      JSON_OBJECT(\n" +
                    "        'id', id, \n" +
                    "        'printer_id', printer_id, \n" +
                    "        'department_id', department_id, \n" +
                    "        'date', date, \n" +
                    "        'title', title, \n" +
                    "        'pages', pages, \n" +
                    "        'color_pages', color_pages, \n" +
                    "        'black_and_white_pages', black_and_white_pages\n" +
                    "      ) as data\n" +
                    "      FROM jobs\n" +
                    "      WHERE YEAR(date) = YEAR(CURRENT_DATE())\n" +
                    "      AND MONTH(date) = MONTH(CURRENT_DATE())\n" +
                    (id != null ? " AND department_id=? \n" : " \n") +
                    "      UNION ALL SELECT\n" +
                    "      'prices' as source,\n" +
                    "      JSON_OBJECT(\n" +
                    "        'id', id,\n" +
                    "        'name', name,\n" +
                    "        'bw_price', bw_price, \n" +
                    "        'color_price', color_price, \n" +
                    "        'paper_price', paper_price,\n" +
                    "        'is_active', is_active\n" +
                    "      ) as data\n" +
                    "      FROM prices\n" +
                    "      UNION ALL SELECT\n" +
                    "      'price' as source,\n" +
                    "      JSON_OBJECT(\n" +
                    "        'id', id,\n" +
                    "        'name', name,\n" +
                    "        'bw_price', bw_price, \n" +
                    "        'color_price', color_price, \n" +
                    "        'paper_price', paper_price,\n" +
                    "        'is_active', is_active\n" +
                    "      ) as data\n" +
                    "      FROM prices\n" +
                    "      WHERE is_active=1\n" +
                    (id != null ? "\n" :
                            "      UNION ALL SELECT\n" +
                                    "      'users' as source,\n" +
                                    "      JSON_OBJECT(\n" +
                                    "        'id', id,\n" +
                                    "        'email', email,\n" +
                                    "        'department_id', department_id,\n" +
                                    "        'type',type\n" +
                                    "      ) as data\n" +
                                    "      FROM users\n"
                    ) +
                    "      ) as all_data \n" +
                    "      GROUP BY source;";
            List<Source> sources = jdbcTemplate.query(query, sourceMapper, params.toArray());
            return sources;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
