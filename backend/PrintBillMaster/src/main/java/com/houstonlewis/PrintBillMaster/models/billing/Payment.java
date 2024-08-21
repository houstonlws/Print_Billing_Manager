package com.houstonlewis.PrintBillMaster.models.billing;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Payment {

    private String id;
    private String billing_id;
    private String payment_date;
    private String amount_paid;
    private String payment_status;

}
