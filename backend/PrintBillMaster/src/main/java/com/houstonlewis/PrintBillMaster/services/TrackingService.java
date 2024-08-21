package com.houstonlewis.PrintBillMaster.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.houstonlewis.PrintBillMaster.dao.TrackingDAO;
import com.houstonlewis.PrintBillMaster.models.tracking.CurrentJobs;
import com.houstonlewis.PrintBillMaster.models.tracking.Job;
import com.houstonlewis.PrintBillMaster.models.tracking.JobHistory;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TrackingService {

    @Autowired
    TrackingDAO trackingDAO;

    public Map<String, Map<String, List<Object>>> getJobHistory(String id) {

        Map<String, Map<String, List<Object>>> payload = new HashMap<>();

        List<JobHistory> jobs = trackingDAO.getJobHistory(id);
        ObjectMapper mapper = new ObjectMapper();

        for (JobHistory obj : jobs) {
            String year = obj.getYear();
            String month = obj.getMonth();
            String jobData = obj.getJobs();
            if (jobData == null) return payload;
            JSONArray arr = new JSONArray(jobData);
            int len = arr.length() - 1;
            while (len > 0) {
                payload.computeIfAbsent(year, k -> new HashMap<>());
                payload.get(year).computeIfAbsent(month, k -> new ArrayList<>());
                List<Object> list = payload.get(year).get(month);
                Object job = arr.get(len);
                try {
                    list.add(mapper.readValue(job.toString(), Job.class));
                } catch (JsonProcessingException e) {
                    System.out.println(e.getMessage());
                }
                len--;
            }
        }

        return payload;
    }

    public List<Job> getCurrentJobs(String id) {

        List<CurrentJobs> jobs = trackingDAO.getCurrentJobs(id);
        ObjectMapper mapper = new ObjectMapper();
        List<Job> payload = new ArrayList<>();

        String data = jobs.get(0).getData();
        if (data == null) return payload;
        JSONArray arr = new JSONArray(data);
        int len = arr.length() - 1;
        while (len > 0) {
            try {
                payload.add(mapper.readValue(arr.get(len).toString(), Job.class));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            len--;
        }

        return payload;
    }

}
