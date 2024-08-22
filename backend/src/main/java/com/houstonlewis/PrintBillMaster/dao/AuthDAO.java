package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Notification;
import com.houstonlewis.PrintBillMaster.models.Source;
import com.houstonlewis.PrintBillMaster.models.User;

import java.util.List;

public interface AuthDAO {

    boolean addLoginInfo(String email, String password);

    boolean addUserInfo(User user);

    String validateLoginInfo(String email, String password);

    User getUserData(String id);

    boolean updateUserData(String id, User user);

    List<Notification> getNotifications(String id);

    List<User> getAllUsers();

    boolean changeUserType(String[] userIds);

    List<Source> getAllData(String id);

}
