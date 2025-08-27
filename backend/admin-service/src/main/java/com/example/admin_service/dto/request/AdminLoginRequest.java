package com.example.admin_service.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AdminLoginRequest {
    private String adminEmail;
    private String adminPassword;
}
