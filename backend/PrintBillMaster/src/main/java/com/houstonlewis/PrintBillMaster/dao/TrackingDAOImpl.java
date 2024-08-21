package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.tracking.CurrentJobs;
import com.houstonlewis.PrintBillMaster.models.tracking.Job;
import com.houstonlewis.PrintBillMaster.models.tracking.JobHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.houstonlewis.PrintBillMaster.utilities.DAOUtilities.getString;

@Repository
public class TrackingDAOImpl implements TrackingDAO {

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

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public List<JobHistory> getJobHistory(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            String query = "SELECT YEAR(date) as year, MONTH(date) as month, JSON_ARRAYAGG(data) AS jobs\n" +
                    "FROM (" +
                    "SELECT date, JSON_OBJECT(" +
                    "'id', id, " +
                    "'printer_id', printer_id, " +
                    "'department_id', department_id, " +
                    "'date', date, " +
                    "'title', title, " +
                    "'pages', pages, " +
                    "'color_pages', color_pages, " +
                    "'black_and_white_pages', black_and_white_pages " +
                    ") as data " +
                    "FROM jobs " +
                    (id != null ? "WHERE department_id=?" : "") +
                    ") as subquery " +
                    "GROUP BY YEAR(date), MONTH(date);";
            List<JobHistory> jobs = jdbcTemplate.query(query, jobHistoryMapper, params.toArray());
            return jobs;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public List<CurrentJobs> getCurrentJobs(String id) {
        try {
            List<String> params = new ArrayList<>();
            if (id != null) params.add(id);
            String query = "SELECT JSON_ARRAYAGG(data) as data " +
                    "FROM( SELECT JSON_OBJECT(" +
                    "'id', id, " +
                    "'printer_id', printer_id, " +
                    "'department_id', department_id, " +
                    "'date', date, " +
                    "'title', title, " +
                    "'pages', pages, " +
                    "'color_pages', color_pages, " +
                    "'black_and_white_pages', black_and_white_pages " +
                    ") as data " +
                    "FROM jobs " +
                    "WHERE YEAR(date) = YEAR(CURRENT_DATE()) " +
                    "AND MONTH(date) = MONTH(CURRENT_DATE()) " +
                    (id != null ? "AND department_id=?" : "") +
                    ") as subquery";
            List<CurrentJobs> jobs = jdbcTemplate.query(query, currentJobsMapper, params.toArray());
            return jobs;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
