package com.example.admin_service.dto.request;

import java.time.LocalDate;

public class AdminCreationRequest {
    private String adminName;
    private String adminEmail;
    private String adminPhone;
    private String adminPassword;
    private String adminGender;
    private LocalDate adminBirthday;

    public String getAdminName() {
        return adminName;
    }

    public void setAdminName(String adminName) {
        this.adminName = adminName;
    }

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getAdminPhone() {
        return adminPhone;
    }

    public void setAdminPhone(String adminPhone) {
        this.adminPhone = adminPhone;
    }

    public String getAdminPassword() {
        return adminPassword;
    }

    public void setAdminPassword(String adminPassword) {
        this.adminPassword = adminPassword;
    }

    public String getAdminGender() {
        return adminGender;
    }

    public void setAdminGender(String adminGender) {
        this.adminGender = adminGender;
    }

    public LocalDate getAdminBirthday() {
        return adminBirthday;
    }

    public void setAdminBirthday(LocalDate adminBirthday) {
        this.adminBirthday = adminBirthday;
    }
}
