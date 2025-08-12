package com.example.admin_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String adminId;
    private String adminName;
    private String adminEmail;
    private String adminPhone;
    private String adminPassword;
    private String adminGender;
    private LocalDate adminBirthday;
}
