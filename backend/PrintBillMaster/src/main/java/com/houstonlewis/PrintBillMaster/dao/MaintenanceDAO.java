package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.maintenance.MaintenanceRequest;

import java.util.List;

public interface MaintenanceDAO {

    List<MaintenanceRequest> getMaintenanceRequests(String id);

    boolean addMaintenanceRequest(MaintenanceRequest request);

    boolean updateMaintenanceStatus(String id, String status);

}
