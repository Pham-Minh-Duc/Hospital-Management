package com.example.patient_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String patientId;
    private String patientName;
    private String patientPhone;
    private String patientEmail;
    private String patientGender;
    private String patientBirthday;
    private String patientAddress;
    private String patientMedicalHistory;
    private String patientAllergies;
    private String patientInsuranceNumber;
    private String patientNotes;
}
