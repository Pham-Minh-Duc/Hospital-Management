package com.example.doctor_service.service;

import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.repository.DoctorRepository;
import com.example.doctor_service.request.DoctorCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor createDoctor(DoctorCreationRequest request){
        Doctor doctor = new Doctor();

        doctor.setDoctorName(request.getDoctorName());
        doctor.setDoctorGender(request.getDoctorGender());
        doctor.setDoctorDob(request.getDoctorDob());
        doctor.setDoctorPhone(request.getDoctorPhone());
        doctor.setDoctorEmail(request.getDoctorEmail());
        doctor.setDoctorDepartment(request.getDoctorDepartment());
        doctor.setDoctorPosition(request.getDoctorPosition());
        doctor.setDoctorQualification(request.getDoctorQualification());
        doctor.setDoctorSpecialization(request.getDoctorSpecialization());
        doctor.setDoctorExperienceYears(request.getDoctorExperienceYears());
        doctor.setDoctorStatus(request.getDoctorStatus());

        return doctorRepository.save(doctor);
    }

    public List<Doctor> getDoctor() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctor(String id){
        return doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public void deleteDoctor(String doctorId) {
        doctorRepository.deleteById(doctorId);
    }
}

