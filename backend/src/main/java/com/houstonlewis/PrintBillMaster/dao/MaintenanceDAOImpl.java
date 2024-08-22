package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.MaintenanceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class MaintenanceDAOImpl implements MaintenanceDAO {

    private final RowMapper<MaintenanceRequest> requestMapper = (rs, rowNum) -> new MaintenanceRequest(
            getString(rs, "id"),
            getString(rs, "department_id"),
            getString(rs, "printer_id"),
            getString(rs, "request_date"),
            getString(rs, "maintenance_type"),
            getString(rs, "description"),
            getString(rs, "status"),
            getString(rs, "resolved_date")
    );
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<MaintenanceRequest> getMaintenanceRequests(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            String query = "SELECT " +
                    "printer_id," +
                    "department_id," +
                    "DATE_FORMAT(request_date, '%Y-%m-%d') as request_date," +
                    "maintenance_type," +
                    "description," +
                    "status," +
                    "DATE_FORMAT(resolved_date, '%Y-%m-%d') as resolved_date " +
                    "FROM maintenance_requests" + (id != null ? " WHERE department_id=?" : "");
            List<MaintenanceRequest> requests = jdbcTemplate.query(query, requestMapper, params.toArray());
            return requests;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean addMaintenanceRequest(MaintenanceRequest request) {
        try {
            String stmt = "INSERT INTO " +
                    "maintenance_requests" +
                    "(printer_id," +
                    "department_id," +
                    "request_date," +
                    "maintenance_type," +
                    "description," +
                    "status)" +
                    "VALUES" +
                    "(?,?,?,?,?,'Pending')";
            int added = jdbcTemplate.update(stmt, request.getPrinter_id(), request.getDepartment_id(), request.getRequest_date(), request.getMaintenance_type(), request.getDescription());
            return added != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updateMaintenanceStatus(String id, String status) {
        try {
            String stmt = "UPDATE maintenance_requests SET status=? WHERE id=?";
            int updated = jdbcTemplate.update(stmt, status, id);
            return updated != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
