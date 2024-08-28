package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.PriceProfile;

import java.util.List;

public interface AppDAO {

    PriceProfile getPriceProfile();

    List<PriceProfile> getPriceProfileList();

    boolean setPriceProfile(String id);

    boolean addPriceProfile(PriceProfile profile);

    boolean updatePriceProfile(PriceProfile profile);

}
