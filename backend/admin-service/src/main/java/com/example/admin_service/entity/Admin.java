package com.example.admin_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder //khai báo builder là phải khai báo thêm 2 cái trên
@Entity
@Getter
@Setter
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String adminId;
    private String adminName;
    private String adminEmail;
    private String adminPassword;
    private String adminGender;
    private String adminPhone;
    private String adminBirthday;
}
