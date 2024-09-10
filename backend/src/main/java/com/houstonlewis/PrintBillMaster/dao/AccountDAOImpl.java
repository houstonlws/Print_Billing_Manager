package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Notification;
import com.houstonlewis.PrintBillMaster.models.Source;
import com.houstonlewis.PrintBillMaster.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class AccountDAOImpl implements AccountDAO {
    private static final Logger logger = Logger.getLogger(AuthDAOImpl.class.getName());

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

    private final JdbcTemplate jdbcTemplate;

    public AccountDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public User getUserData(String id) {
        try {
            return jdbcTemplate.query(
                    "SELECT * FROM users WHERE id=?",
                    userMapper, id).get(0);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean updateUserData(String id, User user) {
        List<String> params = new ArrayList<>();
        params.add(user.getFirstName());
        params.add(user.getLastName());
        if (user.getDepartment_id() != "") {
            params.add(user.getDepartment_id());
        }
        params.add(user.getEmail());
        params.add(user.getPhone());
        params.add(id);

        try {
            String stmt = "UPDATE users SET " +
                    "firstName=?, " +
                    "lastName=?, " +
                    (user.getDepartment_id() != "" ? "department_id=?, " : "") +
                    "email=?, " +
                    "phone=? " +
                    "WHERE id=?";
            int added = jdbcTemplate.update(stmt, params.toArray());
            return added != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return false;
        }
    }

    @Override
    public List<Notification> getNotifications(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            return jdbcTemplate.query(
                    "SELECT\n" +
                            "id,\n" +
                            "department_id,\n" +
                            "maintenance_id,\n" +
                            "DATE_FORMAT(notification_date, '%Y-%m-%d') as notification_date,\n" +
                            "message,\n" +
                            "is_read\n" +
                            "FROM notifications WHERE " +
                            (id == null ? "maintenance_id IS NOT NULL" : "department_id=?"),
                    notificationMapper, params.toArray());
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public List<Notification> getUnreadNotifications(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            return jdbcTemplate.query(
                    "SELECT id,\n" +
                            "department_id,\n" +
                            "maintenance_id,\n" +
                            "DATE_FORMAT(notification_date, '%Y-%m-%d') as notification_date,\n" +
                            "message,\n" +
                            "is_read\n " +
                            "FROM notifications\n" +
                            "WHERE is_read=0\n" +
                            (id == null ? "AND maintenance_id IS NOT NULL" : "AND department_id=?"),
                    notificationMapper, params.toArray());
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public List<User> getAllUsers() {
        try {
            return jdbcTemplate.query("SELECT * FROM users", userMapper);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean changeUserType(String[] userIds) {
        try {
            return jdbcTemplate.update(
                    "UPDATE users SET type = (CASE " +
                            "WHEN type = 'ADMIN' THEN 'USER'" +
                            "WHEN type = 'USER' THEN 'ADMIN' " +
                            "END) WHERE id IN (" + String.join(",", userIds) + ")") != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
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

            return jdbcTemplate.query(
                    "SELECT source, JSON_ARRAYAGG(data) AS data \n" +
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
                            "      GROUP BY source;",
                    sourceMapper, params.toArray());
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }
}
