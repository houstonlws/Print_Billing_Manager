package com.houstonlewis.PrintBillMaster.services;

import com.houstonlewis.PrintBillMaster.dao.AppDAO;
import com.houstonlewis.PrintBillMaster.models.PriceProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppService {

    @Autowired
    private AppDAO appDAO;

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
