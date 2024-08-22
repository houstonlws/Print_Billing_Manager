package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.CurrentJobs;
import com.houstonlewis.PrintBillMaster.models.JobHistory;
import com.houstonlewis.PrintBillMaster.models.Totals;

import java.util.List;

public interface TrackingDAO {

    List<JobHistory> getJobHistory(String id);

    List<CurrentJobs> getCurrentJobs(String id);

    Totals getCurrentTotals(String id);
    
}
