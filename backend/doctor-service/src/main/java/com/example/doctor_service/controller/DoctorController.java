package com.example.doctor_service.controller;

import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.request.DoctorCreationRequest;
import com.example.doctor_service.request.DoctorUpdateRequest;
import com.example.doctor_service.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @PostMapping
    Doctor createDoctor(@RequestBody DoctorCreationRequest request){
        return doctorService.createDoctor(request);
    }

    @GetMapping
    List<Doctor> getDoctor(){
        return doctorService.getDoctor();
    }

    @GetMapping("/{doctorId}")
    Doctor getDoctor(@PathVariable String doctorId){
        return doctorService.getDoctor(doctorId);
    }

    @PutMapping("/{doctorId}")
    Doctor putDoctor(@PathVariable String doctorId, @RequestBody DoctorUpdateRequest request) {
        return doctorService.updateDoctor(doctorId, request);
    }

    @DeleteMapping("/{doctorId}")
    String deleteDoctor(@PathVariable String doctorId) {
        doctorService.deleteDoctor(doctorId);
        return "Xóa bác sĩ thành công";
    }
}
