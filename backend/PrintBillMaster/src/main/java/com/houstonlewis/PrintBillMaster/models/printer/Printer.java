package com.houstonlewis.PrintBillMaster.models.printer;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Printer {

    private String id;
    private String serial_number;
    private String model;
    private String brand;
    private String location;
    private String installation_date;
    private String warranty_expiry_date;
    private String ip_address;
    private String mac_address;
    private String firmware_version;
    private String department_id;

}
