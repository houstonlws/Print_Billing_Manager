package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.PriceProfile;

public interface AppDAO {

    PriceProfile getPriceProfile();

    boolean setPriceProfile(String id);

    boolean addPriceProfile(PriceProfile profile);

    boolean updatePriceProfile(PriceProfile profile);

}
