package com.example.doctor_service.request;

import java.time.LocalDate;

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

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorGender() {
        return doctorGender;
    }

    public void setDoctorGender(String doctorGender) {
        this.doctorGender = doctorGender;
    }

    public String getDoctorDob() {
        return doctorDob;
    }

    public void setDoctorDob(String doctorDob) {
        this.doctorDob = doctorDob;
    }

    public String getDoctorPhone() {
        return doctorPhone;
    }

    public void setDoctorPhone(String doctorPhone) {
        this.doctorPhone = doctorPhone;
    }

    public String getDoctorEmail() {
        return doctorEmail;
    }

    public void setDoctorEmail(String doctorEmail) {
        this.doctorEmail = doctorEmail;
    }

    public String getDoctorDepartment() {
        return doctorDepartment;
    }

    public void setDoctorDepartment(String doctorDepartment) {
        this.doctorDepartment = doctorDepartment;
    }

    public String getDoctorPosition() {
        return doctorPosition;
    }

    public void setDoctorPosition(String doctordPosition) {
        this.doctorPosition = doctordPosition;
    }

    public String getDoctorQualification() {
        return doctorQualification;
    }

    public void setDoctorQualification(String doctorQualification) {
        this.doctorQualification = doctorQualification;
    }

    public String getDoctorSpecialization() {
        return doctorSpecialization;
    }

    public void setDoctorSpecialization(String doctorSpecialization) {
        this.doctorSpecialization = doctorSpecialization;
    }

    public Integer getDoctorExperienceYears() {
        return doctorExperienceYears;
    }

    public void setDoctorExperienceYears(Integer doctorExperienceYears) {
        this.doctorExperienceYears = doctorExperienceYears;
    }
}
