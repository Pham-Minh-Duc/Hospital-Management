package com.example.doctor_service.controller;

import com.example.doctor_service.dto.DoctorDto;
import com.example.doctor_service.dto.DoctorInfoDto;
import com.example.doctor_service.dto.SpecializationDto;
import com.example.doctor_service.dto.StatusUpdateDto;
import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.repository.DoctorRepository;
import com.example.doctor_service.request.DoctorCreationRequest;
import com.example.doctor_service.request.DoctorUpdateRequest;
import com.example.doctor_service.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;
    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorService doctorService, DoctorRepository doctorRepository) {
        this.doctorService = doctorService;
        this.doctorRepository = doctorRepository;
    }

    //----------------------------CRUD-----------------------------------------------
    //web admin: hiển thị danh sách bác sĩ
    @GetMapping
    public List<DoctorInfoDto> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(d -> {
                    DoctorInfoDto dto = new DoctorInfoDto();
                    dto.setDoctorId(d.getDoctorId());
                    dto.setDoctorName(d.getDoctorName());
                    dto.setDoctorGender(d.getDoctorGender());
                    dto.setDoctorDob(d.getDoctorDob());
                    dto.setDoctorPhone(d.getDoctorPhone());
                    dto.setDoctorEmail(d.getDoctorEmail());
                    dto.setDoctorPosition(d.getDoctorPosition());
                    dto.setDoctorQualification(d.getDoctorQualification());
                    dto.setDoctorSpecializationName(
                            d.getDoctorSpecialization() != null
                                    ? d.getDoctorSpecialization().getSpecializationName()
                                    : ""
                    );
                    dto.setDoctorStatus(d.getDoctorStatus());
                    dto.setDoctorExperienceYears(d.getDoctorExperienceYears());
                    return dto;
                }).collect(Collectors.toList());
    }
    //web admin: thêm bác sĩ
    @PostMapping
    public Doctor createDoctor(@RequestBody DoctorInfoDto request){
        return doctorService.createDoctor(request);
    }
    //web admin: xóa bác sĩ
    @DeleteMapping("/{doctorId}")
    public String deleteDoctor(@PathVariable Long doctorId) {
        doctorService.deleteDoctor(doctorId);
        return "Xóa bác sĩ thành công";
    }
    //web admin: sửa bác sĩ
    @PutMapping("/{doctorId}")
    public Doctor updateDoctor(@PathVariable Long doctorId, @RequestBody DoctorInfoDto dto) {
        return doctorService.updateDoctor(doctorId, dto);
    }
    //------------------------------------------hết CRUD--------------------------------------------


    //app client: lấy danh sách bác sĩ theo id
    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }
    //web admin: lấy danh sách bác sĩ theo chuyên khoa
    @GetMapping("/by-specialization/{specializationId}")
    public ResponseEntity<List<DoctorDto>> getDoctorsBySpecialization(@PathVariable Long specializationId) {
        List<Doctor> doctors = doctorService.getDoctorsBySpecialization(specializationId);

        // map sang DTO
        List<DoctorDto> doctorDtos = doctors.stream().map(d -> {
            DoctorDto dto = new DoctorDto();
            dto.setDoctorId(d.getDoctorId());
            dto.setDoctorName(d.getDoctorName());
            dto.setSpecialization(new SpecializationDto(
                    d.getDoctorSpecialization().getSpecializationId(),
                    d.getDoctorSpecialization().getSpecializationName()
            ));
            return dto;
        }).toList();
        return ResponseEntity.ok(doctorDtos);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<StatusUpdateDto> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateDto request){
        StatusUpdateDto updated = doctorService.updateStatus(id, request);
        return ResponseEntity.ok(updated);
    }
}

