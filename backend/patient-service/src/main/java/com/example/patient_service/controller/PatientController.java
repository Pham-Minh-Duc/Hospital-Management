package com.example.patient_service.controller;

import com.example.patient_service.dto.request.*;
import com.example.patient_service.entity.Patient;
import com.example.patient_service.repository.PatientRepository;
import com.example.patient_service.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("patients")
public class PatientController {

    @Autowired
    private PatientService patientService;
    @Autowired
    private final PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @PostMapping("/login")
    public PatientLoginResponse login(@RequestBody PatientLoginRequest request) {
        return patientService.login(request);
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody PatientRegisterDto request) {
        // Kiểm tra email có tồn tại chưa
        Optional<Patient> existing = patientRepository.findByPatientEmail(request.getPatientEmail());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists!");
        }

        Patient newPatient = new Patient();
        newPatient.setPatientName(request.getPatientName());
        newPatient.setPatientEmail(request.getPatientEmail());
        newPatient.setPatientPassword(request.getPatientPassword()); // lưu plain text (theo yêu cầu của anh)
        patientRepository.save(newPatient);

        return ResponseEntity.ok(newPatient);
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
