package com.example.patient_service.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientUpdatePassword {
    private String patientOldPassword;
    private String patientNewPassword;
}
