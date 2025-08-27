package com.example.appointment_service.dto.request;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentCreationRequest {
    private String appointmentDate;
    private String appointmentTime;
    private String doctorName;
    private String doctorId;
    private String AppointmentRoom;
    private String specialty;
    private String patientEmail;
    private String patientName;
    private String patientId;
    private String appointmentStatus;
    private String appointmentNote;
}
