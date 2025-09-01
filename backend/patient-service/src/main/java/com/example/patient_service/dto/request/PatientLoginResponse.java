package com.example.patient_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PatientLoginResponse {
    private String id;
    private String name;
    private String email;
}
