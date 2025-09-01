package com.example.patient_service.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientLoginRequest {
    private String email;
    private String password;
}
