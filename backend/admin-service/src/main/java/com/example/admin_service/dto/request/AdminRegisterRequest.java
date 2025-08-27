package com.example.admin_service.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminRegisterRequest {
    private String adminName;
    private String adminEmail;
    private String adminPassword;
    private String adminGender;
    private String adminPhone;
    private String adminBirthday;

}
