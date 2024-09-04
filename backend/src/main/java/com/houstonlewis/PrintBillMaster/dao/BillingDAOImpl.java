package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Bill;
import com.houstonlewis.PrintBillMaster.models.Invoice;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class BillingDAOImpl implements BillingDAO {

    private static final Logger logger = Logger.getLogger(BillingDAOImpl.class.getName());

    private final RowMapper<Bill> billMapper = (rs, rowNum) -> new Bill(
            getString(rs, "id"),
            getString(rs, "department_id"),
            getString(rs, "billing_cycle_start"),
            getString(rs, "billing_cycle_end"),
            getString(rs, "total_charges"),
            getString(rs, "total_paper"),
            getString(rs, "total_color_pages"),
            getString(rs, "total_bw_pages"),
            getString(rs, "color_pages_charge"),
            getString(rs, "bw_pages_charge")
    );

    private final RowMapper<Invoice> invoiceMapper = (rs, rowNum) -> new Invoice(
            getString(rs, "id"),
            getString(rs, "department_id"),
            getString(rs, "month"),
            getString(rs, "year"),
            getString(rs, "price_profile_id"),
            getString(rs, "bw_charge"),
            getString(rs, "color_charge"),
            getString(rs, "paper_charge"),
            getString(rs, "status")
    );

    private final JdbcTemplate jdbcTemplate;

    public BillingDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Bill> getDepartmentBilling(String id) {
        try {
            return jdbcTemplate.query(
                    "SELECT id,\n" +
                            "department_id,\n" +
                            "DATE_FORMAT(billing_cycle_start, '%Y-%m-%d') as billing_cycle_start,\n" +
                            "DATE_FORMAT(billing_cycle_end, '%Y-%m-%d') as billing_cycle_end, \n" +
                            "total_charges,\n" +
                            "total_paper,\n" +
                            "total_color_pages,\n" +
                            "total_bw_pages,\n" +
                            "color_pages_charge,\n" +
                            "bw_pages_charge\n" +
                            "FROM billing \n" +
                            "WHERE department_id=?",
                    billMapper, id);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public List<Invoice> getDepartmentInvoiceHistory(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            return jdbcTemplate.query(
                    "SELECT\n" +
                            "invoices.id,\n" +
                            "department_id,\n" +
                            "price_profile_id,\n" +
                            "MONTH(date) as month,\n" +
                            "YEAR(date) as year,\n" +
                            "bw_charge,\n" +
                            "color_charge,\n" +
                            "paper_charge,\n" +
                            "status\n" +
                            "FROM invoices\n" +
                            "LEFT JOIN billing_periods\n" +
                            "ON billing_periods.id= bill_period_id\n" +
                            (id != null ? "WHERE department_id=?\n" : "\n") +
                            "ORDER BY YEAR(date) DESC, MONTH(date) DESC",
                    invoiceMapper, params.toArray());
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public Invoice getCurrentInvoice(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            List<Invoice> invoice = jdbcTemplate.query(
                    "SELECT\n" +
                            "invoices.id,\n" +
                            "MONTH(date) AS month,\n" +
                            "YEAR(date) AS year,\n" +
                            "price_profile_id,\n" +
                            "bw_charge,\n" +
                            "color_charge,\n" +
                            "paper_charge,\n" +
                            "status\n" +
                            "FROM invoices\n" +
                            "LEFT JOIN billing_periods\n" +
                            "ON billing_periods.id= bill_period_id\n" +
                            "WHERE department_id=?\n" +
                            "AND YEAR(date) = YEAR(CURRENT_DATE())\n" +
                            "AND MONTH(date) = MONTH(CURRENT_DATE())",
                    invoiceMapper, params.toArray());
            if (invoice.isEmpty()) {
                return null;
            } else return invoice.get(0);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

}
