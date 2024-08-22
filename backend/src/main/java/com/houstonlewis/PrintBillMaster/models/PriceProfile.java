package com.houstonlewis.PrintBillMaster.models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PriceProfile {

    private String id;
    private String name;
    private String bw_price;
    private String color_price;
    private String paper_price;
    private String is_active;


}
