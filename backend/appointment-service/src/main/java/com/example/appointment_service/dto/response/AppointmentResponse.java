package com.example.appointment_service.dto.response;

import com.example.appointment_service.dto.DoctorDto;
import com.example.appointment_service.dto.PatientDto;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentResponse {
    private Long appointmentId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String appointmentRoom;
    private String appointmentStatus;
    private String appointmentNote;

    private DoctorDto doctor;
    private PatientDto patient;

    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
}
