package com.example.doctor_service.service;

import com.example.doctor_service.dto.DoctorInfoDto;
import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.entity.Specialization;
import com.example.doctor_service.repository.DoctorRepository;
import com.example.doctor_service.repository.SpecializationRepository;
import com.example.doctor_service.request.DoctorCreationRequest;
import com.example.doctor_service.request.DoctorUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SpecializationRepository specializationRepository;

    public DoctorService(DoctorRepository doctorRepository, SpecializationRepository specializationRepository) {
        this.doctorRepository = doctorRepository;
        this.specializationRepository = specializationRepository;
    }
    //web admin: thêm bác sĩ
    public Doctor createDoctor(DoctorInfoDto dto) {
        Doctor doctor = new Doctor();
        doctor.setDoctorName(dto.getDoctorName());
        doctor.setDoctorGender(dto.getDoctorGender());
        doctor.setDoctorDob(dto.getDoctorDob());
        doctor.setDoctorPhone(dto.getDoctorPhone());
        doctor.setDoctorEmail(dto.getDoctorEmail());
        doctor.setDoctorPosition(dto.getDoctorPosition());
        doctor.setDoctorQualification(dto.getDoctorQualification());
        doctor.setDoctorStatus(dto.getDoctorStatus());
        doctor.setDoctorExperienceYears(dto.getDoctorExperienceYears());

        // Gắn chuyên khoa bằng specializationId
        if (dto.getSpecializationId() != null) {
            Specialization spec = specializationRepository.findById(dto.getSpecializationId())
                    .orElseThrow(() -> new RuntimeException("Chuyên khoa không tồn tại"));
            doctor.setDoctorSpecialization(spec);
        }

        return doctorRepository.save(doctor);
    }

    //web admin: xóa bác sĩ
    public void deleteDoctor(Long doctorId) {
        doctorRepository.deleteById(doctorId);
    }

    //web admin: sửa bác sĩ
    public Doctor updateDoctor(Long doctorId, DoctorInfoDto dto) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Bác sĩ không tồn tại với id: " + doctorId));

        doctor.setDoctorName(dto.getDoctorName());
        doctor.setDoctorGender(dto.getDoctorGender());
        doctor.setDoctorDob(dto.getDoctorDob());
        doctor.setDoctorPhone(dto.getDoctorPhone());
        doctor.setDoctorEmail(dto.getDoctorEmail());
        doctor.setDoctorPosition(dto.getDoctorPosition());
        doctor.setDoctorQualification(dto.getDoctorQualification());
        doctor.setDoctorExperienceYears(dto.getDoctorExperienceYears());
        doctor.setDoctorStatus(dto.getDoctorStatus());

        // cập nhật chuyên khoa
        if (dto.getSpecializationId() != null) {
            Specialization spec = specializationRepository.findById(dto.getSpecializationId())
                    .orElseThrow(() -> new RuntimeException("Chuyên khoa không tồn tại"));
            doctor.setDoctorSpecialization(spec);
        }
        return doctorRepository.save(doctor);
    }

//
//    public List<Doctor> getDoctor() {
//        return doctorRepository.findAll();
//    }
//
    public Doctor getDoctorById(Long id){
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public List<Doctor> getDoctorsBySpecialization(Long specializationId) {
        return doctorRepository.findByDoctorSpecialization_SpecializationId(specializationId);
    }
}

