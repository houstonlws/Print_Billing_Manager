package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.controllers.TrackingController;
import com.houstonlewis.PrintBillMaster.models.Printer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class PrinterDAOImpl implements PrinterDAO {

    private static final Logger logger = Logger.getLogger(TrackingController.class.getName());

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

    private final JdbcTemplate jdbcTemplate;

    public PrinterDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Printer> getPrinters(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            return jdbcTemplate.query(
                    "SELECT * FROM printers\n" +
                            (id == null ? "" : "WHERE department_id=?"),
                    printerMapper, params.toArray());
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public boolean addPrinter(Printer printer) {
        try {
            return jdbcTemplate.update(
                    "INSERT INTO printers " +
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
                            "(?,?,?,?,?,?,?,?,?,?)",
                    printer.getSerial_number(),
                    printer.getModel(),
                    printer.getBrand(),
                    printer.getLocation(),
                    printer.getInstallation_date(),
                    printer.getWarranty_expiry_date(),
                    printer.getIp_address(),
                    printer.getMac_address(),
                    printer.getFirmware_version(),
                    printer.getDepartment_id())
                    != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return false;
        }
    }

    @Override
    public boolean updatePrinter(Printer printer) {
        try {
            return jdbcTemplate.update(
                    "UPDATE printers " +
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
                            "WHERE id = ?",
                    printer.getSerial_number(),
                    printer.getModel(),
                    printer.getBrand(),
                    printer.getLocation(),
                    printer.getInstallation_date(),
                    printer.getWarranty_expiry_date(),
                    printer.getIp_address(),
                    printer.getMac_address(),
                    printer.getFirmware_version(),
                    printer.getId())
                    != 0;
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return false;
        }
    }
}
