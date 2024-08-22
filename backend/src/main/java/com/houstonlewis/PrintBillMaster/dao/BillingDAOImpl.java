package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class BillingDAOImpl implements BillingDAO {

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
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Bill> getDepartmentBilling(String id) {
        try {
            String query = "SELECT id,\n" +
                    "            department_id,\n" +
                    "            DATE_FORMAT(billing_cycle_start, '%Y-%m-%d') as billing_cycle_start,\n" +
                    "            DATE_FORMAT(billing_cycle_end, '%Y-%m-%d') as billing_cycle_end, \n" +
                    "            total_charges,\n" +
                    "            total_paper,\n" +
                    "            total_color_pages,\n" +
                    "            total_bw_pages,\n" +
                    "            color_pages_charge,\n" +
                    "            bw_pages_charge\n" +
                    "            FROM billing \n" +
                    "            WHERE department_id=?";
            List<Bill> bills = jdbcTemplate.query(query, billMapper, id);
            return bills;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

}
