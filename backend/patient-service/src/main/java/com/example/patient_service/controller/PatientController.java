package com.example.patient_service.controller;

import com.example.patient_service.dto.request.*;
import com.example.patient_service.entity.Patient;
import com.example.patient_service.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/register")
    public PatientRegisterDto register(@RequestBody PatientRegisterDto request) {
        return patientService.registerPatient(request);
    }
//------------------------------------------CRUD----------------------------------------------------
    //web admin: hiển thị danh sách bệnh nhân
    @GetMapping
    List<Patient> getPatient() {
        return patientService.getPatient();
    }
    //web admin: thêm bệnh nhân
    @PostMapping
    Patient createPatient(@RequestBody PatientCreationRequest request){
        return patientService.createPatient(request);
    }
    //web admin: xóa bệnh nhân
    @DeleteMapping("/{patientId}")
    String deletePatient(@PathVariable Long patientId){
        patientService.deletePatient(patientId);
        return "Patient has been deleted";
    }
    //web admin: chỉnh sửa thông tin bệnh nhân
    @PutMapping("/{patientId}")
    Patient putPatient(@PathVariable Long patientId, @RequestBody PatientUpdateRequest request) {
        return patientService.updatePatient(patientId, request);
    }
//-------------------------------------hết CRUD-------------------------------------------------------
    // lấy thông tin bệnh nhân theo Id
    @GetMapping("/{patientId}")
    Patient getPatient(@PathVariable Long patientId){
        return patientService.getPatient(patientId);
    }
    //app client: đổi mật khẩu
    @PutMapping("/{userId}/change-password")
    public ResponseEntity<String> changePassword(@PathVariable Long userId, @RequestBody PatientUpdatePassword request) {
        patientService.changePassword(userId, request);
        return ResponseEntity.ok("Đổi mật khẩu thành công");
    }

}
