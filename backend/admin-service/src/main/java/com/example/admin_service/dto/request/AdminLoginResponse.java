package com.example.admin_service.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AdminLoginResponse {
    private String message;
    private String adminName;

    public AdminLoginResponse(String message, String adminName) {
        this.message = message;
        this.adminName = adminName;
    }

}
