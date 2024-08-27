package com.houstonlewis.PrintBillMaster.models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BillingPeriod {

    private String id;
    private String month;
    private String year;
    
}
