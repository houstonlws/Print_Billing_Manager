package com.houstonlewis.PrintBillMaster.models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Job {

    private String id;
    private String printer_id;
    private String department_id;
    private String date;
    private String title;
    private String pages;
    private String color_pages;
    private String black_and_white_pages;

}
