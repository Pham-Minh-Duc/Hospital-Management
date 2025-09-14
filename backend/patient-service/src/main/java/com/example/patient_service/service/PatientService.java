package com.example.patient_service.service;

import com.example.patient_service.dto.request.*;
import com.example.patient_service.entity.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.patient_service.repository.PatientRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Patient createPatient(PatientCreationRequest request){
        Patient patient = new Patient();

        patient.setPatientName(request.getPatientName());
        patient.setPatientAvatar(request.getPatientAvatar());
        patient.setPatientPhone(request.getPatientPhone());
        patient.setPatientEmail(request.getPatientEmail());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientBirthday(request.getPatientBirthday());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientInsuranceNumber(request.getPatientInsuranceNumber());

        return patientRepository.save(patient);
    }

    public Patient updatePatient(Long patientId, PatientUpdateRequest request){
        Patient patient = getPatient(patientId);

        patient.setPatientName(request.getPatientName());
        patient.setPatientAvatar(request.getPatientAvatar());
        patient.setPatientPhone(request.getPatientPhone());
        patient.setPatientEmail(request.getPatientEmail());
        patient.setPatientGender(request.getPatientGender());
        patient.setPatientBirthday(request.getPatientBirthday());
        patient.setPatientAddress(request.getPatientAddress());
        patient.setPatientInsuranceNumber(request.getPatientInsuranceNumber());

        return patientRepository.save(patient);
    }

    public void changePassword(Long userId, PatientUpdatePassword request) {
        Patient patient = patientRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bệnh nhân"));

        // So sánh mật khẩu cũ (plaintext)
        if (!patient.getPatientPassword().equals(request.getPatientOldPassword())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }

        // Lưu mật khẩu mới (plaintext luôn)
        patient.setPatientPassword(request.getPatientNewPassword());
        patientRepository.save(patient);
    }


    public void deletePatient(Long patientId) {
        patientRepository.deleteById(patientId);
    }

    public List<Patient> getPatient() {
        return patientRepository.findAll();
    }

    public Patient getPatient(Long id){
        return patientRepository.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public PatientLoginResponse login(PatientLoginRequest request) {
        Patient patient = patientRepository.findByPatientEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Error username or password !"));
        if (!patient.getPatientPassword().equals(request.getPassword())) {
            throw new RuntimeException("Error username or password !");
        }
        return new PatientLoginResponse(
                patient.getPatientId(),
                patient.getPatientName(),
                patient.getPatientEmail()
        );
    }

    public PatientRegisterDto registerPatient(PatientRegisterDto request){
//        Patient patient = Patient.builder()
//                    patientName(request.getPatientPassword())
//                    patientEmail(request.getPatientEmail())
//                    patientPassword(request.getPatientPassword())
//                    patientPhone(request.getPatientPhone())
//                    patientGender(request.getPatientGender())
//                    patientBirthday(request.getPatientBirthday())
//                    patientAddress(request.getPatientAddress())
//                    patientInsuranceNumber(request.getPatientInsuranceNumber())
//                    .build();
        return request;
    }


}



