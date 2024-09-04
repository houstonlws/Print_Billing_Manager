package com.houstonlewis.PrintBillMaster.services;

import com.houstonlewis.PrintBillMaster.dao.AppDAO;
import com.houstonlewis.PrintBillMaster.models.PriceProfile;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {

    private final AppDAO appDAO;

    public AppService(AppDAO appDAO) {
        this.appDAO = appDAO;
    }

    public PriceProfile getPriceProfile() {
        return appDAO.getPriceProfile();
    }

    public List<PriceProfile> getPriceProfileList() {
        return appDAO.getPriceProfileList();
    }

    public boolean setPriceProfile(String id) {
        return appDAO.setPriceProfile(id);
    }

    public boolean addPriceProfile(PriceProfile profile) {
        return appDAO.addPriceProfile(profile);
    }

    public boolean updatePriceProfile(PriceProfile profile) {
        return appDAO.updatePriceProfile(profile);
    }

}
