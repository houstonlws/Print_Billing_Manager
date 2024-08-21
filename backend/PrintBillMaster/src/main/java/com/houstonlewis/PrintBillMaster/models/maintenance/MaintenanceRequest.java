package com.houstonlewis.PrintBillMaster.models.maintenance;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MaintenanceRequest {

    private String id;
    private String department_id;
    private String printer_id;
    private String request_date;
    private String maintenance_type;
    private String description;
    private String status;
    private String resolved_date;

}
