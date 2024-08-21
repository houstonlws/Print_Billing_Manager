package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.tracking.CurrentJobs;
import com.houstonlewis.PrintBillMaster.models.tracking.JobHistory;

import java.util.List;

public interface TrackingDAO {

    List<JobHistory> getJobHistory(String id);

    List<CurrentJobs> getCurrentJobs(String id);

}
