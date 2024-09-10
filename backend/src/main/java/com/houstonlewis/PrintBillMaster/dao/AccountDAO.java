package com.houstonlewis.PrintBillMaster.dao;

import com.houstonlewis.PrintBillMaster.models.Notification;
import com.houstonlewis.PrintBillMaster.models.Source;
import com.houstonlewis.PrintBillMaster.models.User;

import java.util.List;

public interface AccountDAO {
    User getUserData(String id);

    boolean updateUserData(String id, User user);

    List<Notification> getNotifications(String id);

    List<Notification> getUnreadNotifications(String id);

    List<User> getAllUsers();

    boolean changeUserType(String[] userIds);

    List<Source> getAllData(String id);
}
