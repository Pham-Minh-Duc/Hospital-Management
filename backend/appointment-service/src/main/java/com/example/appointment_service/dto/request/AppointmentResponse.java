package com.example.appointment_service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentResponse {
    private String appointmentId;
    private String appointmentDate;
    private String appointmentTime;
    private String doctorName;
    private String doctorId;
    private String appointmentRoom;
    private String specialty;
    private String appointmentStatus;
    private String appointmentNote;

    private String patientId;
    private String patientName;
    private String patientEmail;

}
