package com.example.patient_service.dto.request;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientRegisterDto {
    private String patientName;
    private String patientEmail;
    private String patientPassword;
    private String patientPhone;
    private String patientGender;
    private String patientBirthday;
    private String patientAddress;
    private String patientInsuranceNumber;
}
