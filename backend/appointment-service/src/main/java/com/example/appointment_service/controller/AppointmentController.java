package com.example.appointment_service.controller;

import com.example.appointment_service.dto.request.AppointmentCreationRequest;
import com.example.appointment_service.dto.request.AppointmentResponse;
import com.example.appointment_service.entity.Appointment;
import com.example.appointment_service.repository.AppointmentRepository;
import com.example.appointment_service.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }


//    @GetMapping("/raw")
//    List<Appointment> getAppointment(){
//        return appointmentService.getAppointment();
//    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        List<AppointmentResponse> responses = appointmentService.getAllAppointmentsWithPatient();
        return ResponseEntity.ok(responses);
    }

// hiển thị danh sách lịch khám theo từng client.
    @GetMapping("/{patientId}")
    public List<Appointment> getAppointments(@PathVariable String patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
    }

}
