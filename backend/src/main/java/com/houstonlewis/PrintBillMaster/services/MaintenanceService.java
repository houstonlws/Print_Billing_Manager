package com.houstonlewis.PrintBillMaster.services;

import com.houstonlewis.PrintBillMaster.dao.MaintenanceDAO;
import com.houstonlewis.PrintBillMaster.models.MaintenanceRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceService {

    private final MaintenanceDAO maintenanceDAO;

    public MaintenanceService(MaintenanceDAO maintenanceDAO) {
        this.maintenanceDAO = maintenanceDAO;
    }

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
