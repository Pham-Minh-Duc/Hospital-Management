package com.example.appointment_service.dto.request;

import com.example.appointment_service.dto.DoctorDto;
import com.example.appointment_service.dto.PatientDto;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentCreationRequest {
    private String appointmentId;
    private String appointmentDate;
    private String appointmentTime;
    private String appointmentRoom;
    private String appointmentStatus;
    private String appointmentNote;
    private PatientDto patient;
    private DoctorDto doctor;
    private String createdAt;
    private String updateAt;
}
