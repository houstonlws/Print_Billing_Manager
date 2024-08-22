package com.houstonlewis.PrintBillMaster.models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Metric {

    private String id;
    private String printer_id;
    private String total_pages_printed;
    private String monthly_print_volume;
    private String total_print_jobs;
    private String monthly_print_jobs;
    private String toner_levels;
    private String toner_usage_monthly;
    private String paper_levels;
    private String paper_usage_monthly;
    private String total_color_pages_printed;
    private String total_color_pages_last_billing;
    private String total_bw_pages_printed;
    private String total_bw_pages_last_billing;
    private String department_id;
}
