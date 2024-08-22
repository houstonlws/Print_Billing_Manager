package com.houstonlewis.PrintBillMaster.services;

import com.houstonlewis.PrintBillMaster.dao.MaintenanceDAO;
import com.houstonlewis.PrintBillMaster.models.MaintenanceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceService {

    @Autowired
    private MaintenanceDAO maintenanceDAO;

    public List<MaintenanceRequest> getMaintenanceRequests(String id) {
        return maintenanceDAO.getMaintenanceRequests(id);

    }

    public boolean addMaintenanceRequest(MaintenanceRequest request) {
        return maintenanceDAO.addMaintenanceRequest(request);
    }

    public boolean updateStatus(String id, String status) {
        return maintenanceDAO.updateMaintenanceStatus(id, status);
    }
}
