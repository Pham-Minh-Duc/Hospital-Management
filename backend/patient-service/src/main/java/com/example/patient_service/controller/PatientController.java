package com.example.patient_service.controller;

import com.example.patient_service.dto.request.PatientCreationRequest;
import com.example.patient_service.dto.request.PatientLoginRequest;
import com.example.patient_service.dto.request.PatientLoginResponse;
import com.example.patient_service.dto.request.PatientUpdateRequest;
import com.example.patient_service.entity.Patient;
import com.example.patient_service.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/login")
    public PatientLoginResponse login(@RequestBody PatientLoginRequest request) {
        return patientService.login(request);
    }


    @PostMapping
    Patient createPatient(@RequestBody PatientCreationRequest request){
        return patientService.createPatient(request);
    }

    @GetMapping
    List<Patient> getPatient(){
        return patientService.getPatient();
    }

    @GetMapping("/{patientId}")
    Patient getPatient(@PathVariable Long patientId){
        return patientService.getPatient(patientId);
    }

    @PutMapping("/{patientId}")
    Patient putPatient(@PathVariable Long patientId, @RequestBody PatientUpdateRequest request) {
        return patientService.updatePatient(patientId, request);
    }

    @DeleteMapping("/{patientId}")
    String deletePatient(@PathVariable Long patientId){
        patientService.deletePatient(patientId);
        return "Patient has been deleted";
    }
}
