package com.example.doctor_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDto {
    private String doctorId;
    private String doctorName;
    private SpecializationDto specialization;
}

