package com.example.appointment_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
    private String patientId;
    private String patientName;
    private String patientEmail;
    private String patientPhone;
}
