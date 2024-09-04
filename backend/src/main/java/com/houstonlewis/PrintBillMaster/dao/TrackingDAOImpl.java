package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.controllers.TrackingController;
import com.houstonlewis.PrintBillMaster.models.CurrentJobs;
import com.houstonlewis.PrintBillMaster.models.Job;
import com.houstonlewis.PrintBillMaster.models.JobHistory;
import com.houstonlewis.PrintBillMaster.models.Totals;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class TrackingDAOImpl implements TrackingDAO {

    private static final Logger logger = Logger.getLogger(TrackingController.class.getName());

    private final RowMapper<Job> jobMapper = (rs, rowNum) -> new Job(
            getString(rs, "id"),
            getString(rs, "printer_id"),
            getString(rs, "department_id"),
            getString(rs, "date"),
            getString(rs, "title"),
            getString(rs, "pages"),
            getString(rs, "color_pages"),
            getString(rs, "black_and_white_pages")
    );

    private final RowMapper<JobHistory> jobHistoryMapper = (rs, rowNum) -> new JobHistory(
            getString(rs, "year"),
            getString(rs, "month"),
            getString(rs, "jobs")
    );

    private final RowMapper<CurrentJobs> currentJobsMapper = (rs, rowNum) -> new CurrentJobs(
            getString(rs, "data")
    );

    private final RowMapper<Totals> totalsMapper = (rs, rowNum) -> new Totals(
            getString(rs, "totalBw"),
            getString(rs, "totalColor"),
            getString(rs, "totalPaper"),
            getString(rs, "totalJobs"),
            getString(rs, "bwCharge"),
            getString(rs, "colorCharge"),
            getString(rs, "paperCharge"),
            getString(rs, "totalCharge")
    );

    private final JdbcTemplate jdbcTemplate;

    public TrackingDAOImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<JobHistory> getJobHistory(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            return jdbcTemplate.query(
                    "SELECT\n" +
                            "YEAR(date) as year, MONTH(date) as month, JSON_ARRAYAGG(data) AS jobs\n" +
                            "FROM (\n" +
                            "SELECT date, JSON_OBJECT(\n" +
                            "'id', id,\n" +
                            "'printer_id', printer_id,\n" +
                            "'department_id', department_id,\n" +
                            "'date', date,\n" +
                            "'title', title,\n" +
                            "'pages', pages,\n" +
                            "'color_pages', color_pages,\n" +
                            "'black_and_white_pages', black_and_white_pages\n" +
                            ") as data\n" +
                            "FROM jobs\n" +
                            (id != null ? "WHERE department_id=?\n" : "\n") +
                            ") as subquery\n" +
                            "GROUP BY YEAR(date), MONTH(date);",
                    jobHistoryMapper, params.toArray());
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public List<CurrentJobs> getCurrentJobs(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            return jdbcTemplate.query(
                    "SELECT\n" +
                            "JSON_ARRAYAGG(data) as data\n" +
                            "FROM( SELECT JSON_OBJECT(\n" +
                            "'id', id,\n" +
                            "'printer_id', printer_id,\n" +
                            "'department_id', department_id,\n" +
                            "'date', date,\n" +
                            "'title', title,\n" +
                            "'pages', pages,\n" +
                            "'color_pages', color_pages,\n" +
                            "'black_and_white_pages', black_and_white_pages\n" +
                            ") as data\n" +
                            "FROM jobs\n" +
                            "WHERE YEAR(date) = YEAR(CURRENT_DATE())\n" +
                            "AND MONTH(date) = MONTH(CURRENT_DATE())\n" +
                            (id != null ? "AND department_id=?\n" : "\n") +
                            ") as subquery",
                    currentJobsMapper, params.toArray());
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }

    @Override
    public Totals getCurrentTotals(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            jdbcTemplate.update("SET @bw_price = (SELECT bw_price FROM prices WHERE is_active=1),\n" +
                    "@color_price = (SELECT color_price FROM prices WHERE is_active=1),\n" +
                    "@paper_price = (SELECT paper_price FROM prices WHERE is_active=1)");
            return jdbcTemplate.query(
                    "SELECT\n" +
                            "SUM(black_and_white_pages) as totalBw,\n" +
                            "SUM(color_pages) as totalColor,\n" +
                            "SUM(pages) as totalPaper,\n" +
                            "COUNT(*) as totalJobs,\n" +
                            "CAST(SUM(black_and_white_pages) * @bw_price AS DECIMAL(10,2)) as bwCharge,\n" +
                            "CAST(SUM(color_pages) * @color_price AS DECIMAL(10,2)) as colorCharge,\n" +
                            "CAST(SUM(pages) * @paper_price AS DECIMAL(10,2)) as paperCharge,\n" +
                            "CAST((SUM(black_and_white_pages) * @bw_price) +\n" +
                            "\t\t(SUM(color_pages) * @color_price) +\n" +
                            "\t\t(SUM(pages) * @paper_price) AS DECIMAL(10,2)) as totalCharge\n" +
                            "FROM jobs\n" +
                            "WHERE YEAR(date) = YEAR(CURRENT_DATE())\n" +
                            "AND MONTH(date) = MONTH(CURRENT_DATE())\n" +
                            (id != null ? "AND department_id=?" : ""),
                    totalsMapper, params.toArray()).get(0);
        } catch (Exception e) {
            logger.severe(e.getMessage());
            return null;
        }
    }
}
