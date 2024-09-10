package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Notification;
import com.houstonlewis.PrintBillMaster.models.Source;
import com.houstonlewis.PrintBillMaster.models.User;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.logging.Logger;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class AuthDAOImpl implements AuthDAO {

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

    public AuthDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean addLoginInfo(String email, String password) {
        try {
            return jdbcTemplate.update(
                    "INSERT INTO auth (email, password) VALUES (?,?)",
                    email, password) != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean addUserInfo(User user) {
        try {
            int added = jdbcTemplate.update(
                    "INSERT INTO users (id, email, type) VALUES (?,?,'USER')",
                    user.getId(), user.getEmail());
            return added != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return false;
        }
    }

    @Override
    public String validateLoginInfo(String email, String password) {
        try {
            return jdbcTemplate.query(
                    "SELECT id FROM auth WHERE email=? AND password=?",
                    userMapper, email, password).get(0).getId();
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return "";
        }
    }
}
