package com.houstonlewis.PrintBillMaster.models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Invoice {

    private String id;
    private String department_id;
    private String month;
    private String year;
    private String price_profile_id;
    private String bw_charge;
    private String color_charge;
    private String paper_charge;
    private String status;

}
