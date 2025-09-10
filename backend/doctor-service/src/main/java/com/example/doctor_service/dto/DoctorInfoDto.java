package com.example.doctor_service.dto;

import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.entity.Specialization;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoctorInfoDto {
    private Long      doctorId;
    private String    doctorName;
    private String    doctorGender;
    private LocalDate doctorDob;
    private String    doctorPhone;
    private String    doctorEmail;
    private String    doctorPosition;
    private String    doctorQualification;
    private Long      specializationId;
    private String    doctorSpecializationName;
    private String    doctorStatus;
    private Integer   doctorExperienceYears;
}
