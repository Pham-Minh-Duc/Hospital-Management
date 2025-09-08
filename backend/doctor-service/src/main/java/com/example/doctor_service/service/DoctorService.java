package com.example.doctor_service.service;

import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.entity.Specialization;
import com.example.doctor_service.repository.DoctorRepository;
import com.example.doctor_service.repository.SpecializationRepository;
import com.example.doctor_service.request.DoctorCreationRequest;
import com.example.doctor_service.request.DoctorUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final SpecializationRepository specializationRepository;

    public DoctorService(DoctorRepository doctorRepository, SpecializationRepository specializationRepository) {
        this.doctorRepository = doctorRepository;
        this.specializationRepository = specializationRepository;
    }

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
        doctor.setDoctorExperienceYears(request.getDoctorExperienceYears());
        doctor.setDoctorStatus(request.getDoctorStatus());

        // lấy specialization từ DB
        Specialization specialization = specializationRepository.findById(request.getSpecializationId())
                .orElseThrow(() -> new RuntimeException("Specialization not found"));
        doctor.setDoctorSpecialization(specialization);

        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(String doctorId, DoctorUpdateRequest request){
        Doctor doctor = getDoctor(doctorId);

        doctor.setDoctorName(request.getDoctorName());
        doctor.setDoctorGender(request.getDoctorGender());
        doctor.setDoctorDob(request.getDoctorDob());
        doctor.setDoctorPhone(request.getDoctorPhone());
        doctor.setDoctorEmail(request.getDoctorEmail());
        doctor.setDoctorDepartment(request.getDoctorDepartment());
        doctor.setDoctorPosition(request.getDoctorPosition());
        doctor.setDoctorQualification(request.getDoctorQualification());
        doctor.setDoctorExperienceYears(request.getDoctorExperienceYears());
        doctor.setDoctorStatus(request.getDoctorStatus());

        // lấy specialization từ DB
        Specialization specialization = specializationRepository.findById(request.getSpecializationId())
                .orElseThrow(() -> new RuntimeException("Specialization not found"));
        doctor.setDoctorSpecialization(specialization);

        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(String doctorId) {
        doctorRepository.deleteById(doctorId);
    }

    public List<Doctor> getDoctor() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctor(String id){
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public List<Doctor> getDoctorsBySpecialization(Long specializationId) {
        return doctorRepository.findByDoctorSpecialization_SpecializationId(specializationId);
    }
}

