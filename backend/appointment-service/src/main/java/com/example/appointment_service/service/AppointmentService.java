package com.example.appointment_service.service;

//import com.example.appointment_service.client.Doctor_gRPC;
//import com.example.appointment_service.client.Patient_gRPC;
import com.example.appointment_service.config.WebClientConfig;
import com.example.appointment_service.dto.DoctorDto;
import com.example.appointment_service.dto.PatientDto;
import com.example.appointment_service.dto.request.AppointmentCreationRequest;
import com.example.appointment_service.dto.response.AppointmentResponse;
import com.example.appointment_service.entity.Appointment;
import com.example.appointment_service.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    @Autowired
    private final AppointmentRepository appointmentRepository;
    private final WebClient.Builder webClientBuilder;

// lấy danh sách lịch khám theo từng client.
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
                    .uri("http://localhost:8081/doctors/" + a.getDoctorId())
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
        }).collect(Collectors.toList());
    }

// lấy danh sach lịch khám của tất cả client.
    public List<AppointmentResponse> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();

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
                    .uri("http://localhost:8081/doctors/" + a.getDoctorId())
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
        }).collect(Collectors.toList());
    }


//tạo lịch khám theo id
    public Appointment createAppointment(AppointmentCreationRequest request) {
        Appointment appointment = new Appointment();
        appointment.setPatientId(request.getPatientId());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setAppointmentRoom(request.getAppointmentRoom());
        appointment.setAppointmentNote(request.getAppointmentNote());
        appointment.setAppointmentStatus("Chờ xác nhận"); // default status
        return appointmentRepository.save(appointment);
    }

}
