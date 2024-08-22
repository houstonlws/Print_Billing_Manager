package com.houstonlewis.PrintBillMaster.models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {

    private String id;
    private String email;
    private String type;
    private String password;
    private String firstName;
    private String lastName;
    private String department_id;
    private String phone;

    public static User fromString(String str) {
        User user = new User();

        String[] parts = str.replace("User(", "").replace(")", "").split(", ");
        for (String part : parts) {
            String[] keyValue = part.split("=");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim();
                String value = keyValue[1].trim();

                switch (key) {
                    case "id":
                        user.setId(value);
                        break;
                    case "email":
                        user.setEmail(value);
                        break;
                    case "type":
                        user.setType(value);
                        break;
                    case "password":
                        user.setPassword(value);
                        break;
                    case "firstName":
                        user.setFirstName(value);
                        break;
                    case "lastName":
                        user.setLastName(value);
                        break;
                    case "departmentId":
                        user.setDepartment_id(value);
                        break;
                    case "phone":
                        user.setPhone(value);
                        break;
                }
            }
        }

        return user;
    }
}
