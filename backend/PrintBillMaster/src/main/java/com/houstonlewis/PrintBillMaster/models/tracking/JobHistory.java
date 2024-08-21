package com.houstonlewis.PrintBillMaster.models.tracking;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class JobHistory {

    private String year;
    private String month;
    private String jobs;

}
