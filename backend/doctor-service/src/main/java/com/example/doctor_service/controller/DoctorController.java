package com.example.doctor_service.controller;

import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.repository.DoctorRepository;
import com.example.doctor_service.request.DoctorCreationRequest;
import com.example.doctor_service.request.DoctorUpdateRequest;
import com.example.doctor_service.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;
    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorService doctorService, DoctorRepository doctorRepository) {
        this.doctorService = doctorService;
        this.doctorRepository = doctorRepository;
    }

    @PostMapping
    public Doctor createDoctor(@RequestBody DoctorCreationRequest request){
        return doctorService.createDoctor(request);
    }

    @GetMapping("/{doctorId}")
    public Doctor getDoctor(@PathVariable String doctorId){
        return doctorService.getDoctor(doctorId);
    }

    // 📌 Lấy tất cả bác sĩ, hoặc filter theo specializationId
    @GetMapping
    public List<Doctor> getDoctors(@RequestParam(required = false) Long specializationId) {
        if (specializationId != null) {
            return doctorService.getDoctorsBySpecialization(specializationId);
        }
        return doctorService.getDoctor();
    }

    // 📌 Lấy bác sĩ theo specializationName
    @GetMapping("/by-specialization")
    public List<Doctor> getDoctorsBySpecialization(@RequestParam String specializationName) {
        return doctorRepository.findByDoctorSpecialization_SpecializationNameIgnoreCase(specializationName);
    }

    @PutMapping("/{doctorId}")
    public Doctor updateDoctor(@PathVariable String doctorId, @RequestBody DoctorUpdateRequest request) {
        return doctorService.updateDoctor(doctorId, request);
    }

    @DeleteMapping("/{doctorId}")
    public String deleteDoctor(@PathVariable String doctorId) {
        doctorService.deleteDoctor(doctorId);
        return "Xóa bác sĩ thành công";
    }
}

