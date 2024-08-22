package com.houstonlewis.PrintBillMaster.utilities;

import java.sql.ResultSet;

public class DAOUtilities {

    public static String getString(ResultSet rs, String columnName) {
        try {
            return rs.getString(columnName);
        } catch (Exception e) {
            return "";
        }
    }
    
}
