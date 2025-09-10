package com.example.appointment_service.controller;

import com.example.appointment_service.dto.request.AppointmentCreationRequest;
import com.example.appointment_service.dto.response.AppointmentResponse;
import com.example.appointment_service.entity.Appointment;
import com.example.appointment_service.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

//hiển thị danh sách lịch khám
    @GetMapping
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

// hiển thị danh sách lịch khám theo từng client.
    @GetMapping("/patient/{patientId}")
    public List<AppointmentResponse> getAppointmentsByPatient(@PathVariable String patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }
// thêm lịch khám
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentCreationRequest request) {
        Appointment saved = appointmentService.createAppointment(request);
        return ResponseEntity.ok(saved);
    }

}
