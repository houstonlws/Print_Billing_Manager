package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.printer.Metric;
import com.houstonlewis.PrintBillMaster.models.printer.Printer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class PrinterDAOImpl implements PrinterDAO {

    private final RowMapper<Printer> printerMapper = (rs, rowNum) -> new Printer(
            getString(rs, "id"),
            getString(rs, "serial_number"),
            getString(rs, "model"),
            getString(rs, "brand"),
            getString(rs, "location"),
            getString(rs, "installation_date"),
            getString(rs, "warranty_expiry_date"),
            getString(rs, "ip_address"),
            getString(rs, "mac_address"),
            getString(rs, "firmware_version"),
            getString(rs, "department_id")
    );
    private final RowMapper<Metric> metricMapper = (rs, rowNum) -> new Metric(
            getString(rs, "id"),
            getString(rs, "printer_id"),
            getString(rs, "total_pages_printed"),
            getString(rs, "monthly_print_volume"),
            getString(rs, "total_print_jobs"),
            getString(rs, "monthly_print_jobs"),
            getString(rs, "toner_levels"),
            getString(rs, "toner_usage_monthly"),
            getString(rs, "paper_levels"),
            getString(rs, "paper_usage_monthly"),
            getString(rs, "total_color_pages_printed"),
            getString(rs, "total_color_pages_last_billing"),
            getString(rs, "total_bw_pages_printed"),
            getString(rs, "total_bw_pages_last_billing"),
            getString(rs, "department_id")
    );
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<Metric> getMetrics(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            String query = "SELECT * FROM metrics " + (id != null ? "WHERE printer_id=?" : "");
            List<Metric> metrics = jdbcTemplate.query(query, metricMapper, params.toArray());
            return metrics;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public List<Printer> getPrinters(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            String query = "SELECT * FROM printers " + (id == null ? "" : "WHERE department_id=?");
            List<Printer> printers = jdbcTemplate.query(query, printerMapper, params.toArray());
            return printers;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean addPrinter(Printer printer) {
        try {
            String stmt = "INSERT INTO printers " +
                    "(serial_number, " +
                    "model, " +
                    "brand, " +
                    "location, " +
                    "installation_date, " +
                    "warranty_expiry_date, " +
                    "ip_address, " +
                    "mac_address, " +
                    "firmware_version, " +
                    "department_id) " +
                    "VALUES " +
                    "(?,?,?,?,?,?,?,?,?,?)";
            int added = jdbcTemplate.update(stmt,
                    printer.getSerial_number(),
                    printer.getModel(),
                    printer.getBrand(),
                    printer.getLocation(),
                    printer.getInstallation_date(),
                    printer.getWarranty_expiry_date(),
                    printer.getIp_address(),
                    printer.getMac_address(),
                    printer.getFirmware_version(),
                    printer.getDepartment_id());
            return added != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updatePrinter(Printer printer) {
        try {
            String stmt = "UPDATE printers " +
                    "SET " +
                    "serial_number = ?, " +
                    "model =?, " +
                    "brand = ?, " +
                    "location = ?, " +
                    "installation_date = ?, " +
                    "warranty_expiry_date = ?, " +
                    "ip_address = ?, " +
                    "mac_address = ?, " +
                    "firmware_version = ? " +
                    "WHERE id = ?";
            int updated = jdbcTemplate.update(stmt,
                    printer.getSerial_number(),
                    printer.getModel(),
                    printer.getBrand(),
                    printer.getLocation(),
                    printer.getInstallation_date(),
                    printer.getWarranty_expiry_date(),
                    printer.getIp_address(),
                    printer.getMac_address(),
                    printer.getFirmware_version(),
                    printer.getId());
            return updated != 0;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
