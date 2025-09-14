package com.example.patient_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;
    private String patientName;
    private String patientAvatar;
    private String patientEmail;
    private String patientPassword;
    private String patientPhone;
    private String patientGender;
    private String patientBirthday;
    private String patientAddress;
    private String patientInsuranceNumber;
}
