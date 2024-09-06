package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.*;

import java.util.List;

public interface TrackingDAO {

    List<JobHistory> getJobHistory(String id);

    List<CurrentJobs> getCurrentJobs(String id);

    Totals getCurrentTotals(String id);

    List<BillingPeriod> getBillingPeriods(String id);

    BillingPeriod getCurrentBillingPeriod();

    List<Job> getJobsByBillingPeriod(String depId, String bpId);
}
