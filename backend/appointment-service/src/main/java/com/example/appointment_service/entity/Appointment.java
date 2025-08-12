package com.example.appointment_service.entity;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Appointment {
    private String appointmentId;
    private String appointmentDay;
    private String appointmentTime;
    private String appointmentDoctor;
    private String doctorId;
    private String appointmentRoom;
    private String 
}
