package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.User;

public interface AuthDAO {

    boolean addLoginInfo(String email, String password);

    boolean addUserInfo(User user);

    String validateLoginInfo(String email, String password);

}
