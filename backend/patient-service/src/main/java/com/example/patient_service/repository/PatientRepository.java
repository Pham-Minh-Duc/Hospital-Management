package com.example.patient_service.repository;

import com.example.patient_service.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByPatientEmail(String email);
    Optional<Patient> findByPatientId(Long id);
}
