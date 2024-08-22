package com.houstonlewis.PrintBillMaster.models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Notification {

    private String id;
    private String department_id;
    private String maintenance_id;
    private String notification_date;
    private String message;
    private String is_read;

}
