package com.example.doctor_service.repository;

import com.example.doctor_service.dto.DoctorInfoDto;
import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.entity.Specialization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}
