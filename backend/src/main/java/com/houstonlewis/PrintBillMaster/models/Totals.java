package com.houstonlewis.PrintBillMaster.models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Totals {

    private String totalBw;
    private String totalColor;
    private String totalPaper;
    private String totalJobs;
    private String bwCharge;
    private String colorCharge;
    private String paperCharge;
    private String totalCharge;

}
