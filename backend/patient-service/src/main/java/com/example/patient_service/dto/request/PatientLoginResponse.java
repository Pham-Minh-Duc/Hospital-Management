package com.example.patient_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PatientLoginResponse {
    private Long id;
    private String name;
    private String email;
}
