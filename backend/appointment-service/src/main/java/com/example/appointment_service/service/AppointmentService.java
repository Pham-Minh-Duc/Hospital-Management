package com.example.appointment_service.service;

import com.example.appointment_service.dto.DoctorDto;
import com.example.appointment_service.dto.PatientDto;
import com.example.appointment_service.dto.response.AppointmentResponse;
import com.example.appointment_service.dto.request.AppointmentCreationRequest;
import com.example.appointment_service.entity.Appointment;
import com.example.appointment_service.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final WebClient.Builder webClientBuilder;

    // 🔹 Lấy danh sách lịch khám theo patientId
    public List<AppointmentResponse> getAppointmentsByPatient(String patientId) {
        List<Appointment> appointments = appointmentRepository.findByPatientId(patientId);

        return appointments.stream().map(a -> {
            // Gọi patient-service
            PatientDto patient = webClientBuilder.build()
                    .get()
                    .uri("http://localhost:8083/patients/" + a.getPatientId())
                    .retrieve()
                    .bodyToMono(PatientDto.class)
                    .block();

            // Gọi doctor-service
            DoctorDto doctor = webClientBuilder.build()
                    .get()
                    .uri("http://localhost:8085/doctors/" + a.getDoctorId())
                    .retrieve()
                    .bodyToMono(DoctorDto.class)
                    .block();

            return new AppointmentResponse(
                    a.getAppointmentId(),
                    a.getAppointmentDate(),
                    a.getAppointmentTime(),
                    a.getAppointmentRoom(),
                    a.getAppointmentStatus(),
                    a.getAppointmentNote(),
                    a.getCreatedAt(),
                    patient,
                    doctor // trong doctor đã có specialization
            );
        }).collect(Collectors.toList());
    }


    // 🔹 Lấy tất cả lịch khám
    public List<AppointmentResponse> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream().map(a -> mapToResponse(a)).collect(Collectors.toList());
    }

    // 🔹 Tạo lịch khám mới
    public Appointment createAppointment(AppointmentCreationRequest request) {
        Appointment appointment = new Appointment();
        appointment.setPatientId(request.getPatientId());
        appointment.setDoctorId(request.getDoctorId());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setAppointmentRoom(request.getAppointmentRoom());
        appointment.setAppointmentNote(request.getAppointmentNote());
        appointment.setAppointmentStatus("waiting"); // default status
        return appointmentRepository.save(appointment);
    }

    // 🔹 Hàm tái sử dụng để build AppointmentResponse
    private AppointmentResponse mapToResponse(Appointment a) {
        // Gọi patient-service
        PatientDto patient = webClientBuilder.build()
                .get()
                .uri("http://localhost:8083/patients/" + a.getPatientId())
                .retrieve()
                .bodyToMono(PatientDto.class)
                .block();

        // Gọi doctor-service
        DoctorDto doctor = webClientBuilder.build()
                .get()
                .uri("http://localhost:8085/doctors/" + a.getDoctorId())
                .retrieve()
                .bodyToMono(DoctorDto.class)
                .block();

        return new AppointmentResponse(
                String.valueOf(a.getAppointmentId()),
                a.getAppointmentDate(),
                a.getAppointmentTime(),
                a.getAppointmentRoom(),
                a.getAppointmentStatus(),
                a.getAppointmentNote(),
                a.getCreatedAt(),
                patient,
                doctor
        );
    }
}
