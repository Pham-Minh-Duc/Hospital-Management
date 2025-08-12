package com.example.patient_service.service;

import com.example.patient_service.dto.request.PatientCreationRequest;
import com.example.patient_service.dto.request.PatientUpdateRequest;
import com.example.patient_service.entity.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.patient_service.repository.PatientRepository;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public Patient createPatient(PatientCreationRequest request){
        Patient patient = new Patient();

        patient.setPatientName(request.getPatientName());
        patient.setPatientPhone(request.getPatientPhone());
        patient.setPatientEmail(request.getPatientEmail());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientBirthday(request.getPatientBirthday());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientMedicalHistory(request.getPatientMedicalHistory());
        patient.setPatientAllergies(request.getPatientAllergies());
        patient.setPatientInsuranceNumber(request.getPatientInsuranceNumber());
        patient.setPatientNotes(request.getPatientNotes());

        return patientRepository.save(patient);
    }

    public Patient updatePatient(String patientId, PatientUpdateRequest request){
        Patient patient = getPatient(patientId);

        patient.setPatientPhone(request.getPatientPhone());
        patient.setPatientEmail(request.getPatientEmail());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientBirthday(request.getPatientBirthday());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientMedicalHistory(request.getPatientMedicalHistory());
        patient.setPatientAllergies(request.getPatientAllergies());
        patient.setPatientInsuranceNumber(request.getPatientInsuranceNumber());
        patient.setPatientNotes(request.getPatientNotes());

        return patientRepository.save(patient);
    }

    public void deletePatient(String patientId) {
        patientRepository.deleteById(patientId);
    }

    public List<Patient> getPatient() {
        return patientRepository.findAll();
    }

    public Patient getPatient(String id){
        return patientRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
    }
}

