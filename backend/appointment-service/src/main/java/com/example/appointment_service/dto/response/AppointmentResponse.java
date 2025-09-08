package com.example.appointment_service.dto.response;

import com.example.appointment_service.dto.DoctorDto;
import com.example.appointment_service.dto.PatientDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private String appointmentId;
    private String appointmentDate;
    private String appointmentTime;
    private String appointmentRoom;
    private String appointmentStatus;
    private String appointmentNote;
    private LocalDateTime createdAt;

    private PatientDto patient;

    private DoctorDto doctor;
}
