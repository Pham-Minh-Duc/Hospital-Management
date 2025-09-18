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

//---------------------------CRUD----------------------------------------------------------
    //web admin: hiển thị danh sách lịch khám
    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }
    //web admin: thêm lịch khám
    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentCreationRequest request) {
        return ResponseEntity.ok(appointmentService.createAppointment(request));
    }
    //web admin: xóa lịch khám
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("Xóa lịch khám thành công");
    }
    //web admin: chỉnh sửa lịch khám
    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment updatedAppointment) {
        Appointment appt = appointmentService.updateAppointment(id, updatedAppointment);
        return ResponseEntity.ok(appt);
    }
//--------------------------hết CRUD----------------------------------------------


// hiển thị danh sách lịch khám theo từng client.
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsByPatientId(@PathVariable Long patientId) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByPatientId(patientId));
    }

}
