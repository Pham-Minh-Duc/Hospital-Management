package com.example.appointment_service.service;

//import com.example.appointment_service.client.Doctor_gRPC;
//import com.example.appointment_service.client.Patient_gRPC;
import com.example.appointment_service.dto.PatientDto;
import com.example.appointment_service.dto.request.AppointmentCreationRequest;
import com.example.appointment_service.dto.request.AppointmentResponse;
import com.example.appointment_service.entity.Appointment;
import com.example.appointment_service.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    private WebClient webClient;
//    private final Patient_gRPC patientClient;
//    private final Doctor_gRPC doctorClient;


// constructor
    public AppointmentService(AppointmentRepository appointmentRepository, WebClient webClient) {
        this.appointmentRepository = appointmentRepository;
        this.webClient = webClient;
    }

// lấy danh sách lịch khám theo từng client.
    public List<Appointment> getAppointmentsByPatient(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    public List<AppointmentResponse> getAllAppointmentsWithPatient() {
        List<Appointment> appointments = appointmentRepository.findAll();

        return appointments.stream().map(appointment -> {
            PatientDto patient = webClient.get()
                    .uri("/patients/{id}", appointment.getPatientId())
                    .retrieve()
                    .bodyToMono(PatientDto.class)
                    .onErrorResume(e -> {
                        // fallback nếu không gọi được patientService
                        return Mono.just(new PatientDto(appointment.getPatientId(), "Không xác định", ""));
                    })
                    .block();

            return new AppointmentResponse(
                    appointment.getAppointmentId(),
                    appointment.getAppointmentDate(),
                    appointment.getAppointmentTime(),
                    appointment.getDoctorName(),
                    appointment.getDoctorId(),
                    appointment.getAppointmentRoom(),
                    appointment.getSpecialty(),
                    appointment.getAppointmentStatus(),
                    appointment.getAppointmentNote(),
                    patient.getPatientId(),
                    patient.getPatientName(),
                    patient.getPatientEmail()
            );
        }).collect(Collectors.toList());
    }
}
