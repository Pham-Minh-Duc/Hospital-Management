package com.example.doctor_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String  doctorId;
    private String  doctorName;
    private String  doctorGender;
    private String  doctorDob;
    private String  doctorPhone;
    private String  doctorEmail;
    private String  doctorDepartment;
    private String  doctorPosition;
    private String  doctorQualification;
    private String  doctorSpecialization;
    private Integer doctorExperienceYears;
}
