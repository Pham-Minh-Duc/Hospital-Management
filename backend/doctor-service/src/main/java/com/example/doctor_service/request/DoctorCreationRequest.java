package com.example.doctor_service.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DoctorCreationRequest {
    private String doctorName;
    private String doctorGender;
    private String doctorDob;
    private String doctorPhone;
    private String doctorEmail;
    private String doctorDepartment;
    private String doctorPosition;
    private String doctorQualification;
    private String doctorSpecialization;
    private Integer doctorExperienceYears;
    private String doctorStatus;
}
