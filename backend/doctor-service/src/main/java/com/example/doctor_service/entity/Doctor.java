package com.example.doctor_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  doctorId;
    private String  doctorName;
    private String  doctorGender;
    private LocalDate  doctorDob;
    private String  doctorPhone;
    private String  doctorEmail;
    private String  doctorPosition;
    private String  doctorQualification;

    @ManyToOne
    @JoinColumn(name = "specialization_id")
    private Specialization  doctorSpecialization;

    private String  doctorStatus;
    private Integer doctorExperienceYears;
}
