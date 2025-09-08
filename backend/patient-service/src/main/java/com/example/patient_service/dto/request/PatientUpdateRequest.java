package com.example.patient_service.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientUpdateRequest {
    private String patientName;
    private String patientAvatar;
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
