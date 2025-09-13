package com.example.appointment_service.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDto {
    private Long doctorId;
    private String doctorName;
    private SpecializationDto doctorSpecialization;
}
