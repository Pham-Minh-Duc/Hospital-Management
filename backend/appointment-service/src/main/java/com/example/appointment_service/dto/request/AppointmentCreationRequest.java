package com.example.appointment_service.dto.request;

import com.example.appointment_service.dto.DoctorDto;
import com.example.appointment_service.dto.PatientDto;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Setter
public class AppointmentCreationRequest {
    private Long appointmentId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String appointmentRoom;
    private String appointmentStatus;
    private String appointmentNote;
//    private LocalDateTime createdAt;
//    private LocalDateTime updateAt;

    private Long doctorId;
    private Long patientId;
}
