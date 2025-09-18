package com.example.appointment_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
    private Long patientId;
    private String patientName;
    private String patientEmail;
    private String patientAddress;
    private String patientPhone;
}
