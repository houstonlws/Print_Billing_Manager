package com.houstonlewis.PrintBillMaster.models.billing;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Bill {

    private String id;
    private String department_id;
    private String billing_cycle_start;
    private String billing_cycle_end;
    private String total_charges;
    private String total_paper;
    private String total_color_pages;
    private String total_bw_pages;
    private String color_pages_charge;
    private String bw_pages_charge;

}
