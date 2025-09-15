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

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static java.util.logging.Level.parse;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final WebClient.Builder webClientBuilder;

    // 🔹 Lấy danh sách lịch khám theo patientId
//    public List<AppointmentResponse> getAppointmentsByPatient(String patientId) {
//        List<Appointment> appointments = appointmentRepository.findByPatientId(patientId);
//
//        return appointments.stream().map(a -> {
//            // Gọi patient-service
//            PatientDto patient = webClientBuilder.build()
//                    .get()
//                    .uri("http://localhost:8083/patients/" + a.getPatientId())
//                    .retrieve()
//                    .bodyToMono(PatientDto.class)
//                    .block();
//
//            // Gọi doctor-service
//            DoctorDto doctor = webClientBuilder.build()
//                    .get()
//                    .uri("http://localhost:8085/doctors/" + a.getDoctorId())
//                    .retrieve()
//                    .bodyToMono(DoctorDto.class)
//                    .block();
//
//            return new AppointmentResponse(
//                    a.getAppointmentId(),
//                    a.getAppointmentDate(),
//                    a.getAppointmentTime(),
//                    a.getAppointmentRoom(),
//                    a.getAppointmentStatus(),
//                    a.getAppointmentNote(),
//                    a.getCreatedAt(),
//                    patient,
//                    doctor // trong doctor đã có specialization
//            );
//        }).collect(Collectors.toList());
//    }


    // 🔹 Lấy tất cả lịch khám
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(a -> {
            DoctorDto doctor = null;
            PatientDto patient = null;
            if (a.getDoctorId() != null){
                // Gọi doctor-service
                doctor = webClientBuilder.build()
                        .get()
                        .uri("http://localhost:8085/doctors/{id}", a.getDoctorId())
                        .retrieve()
                        .bodyToMono(DoctorDto.class)
                        .block();
            }

            if(a.getPatientId() != null) {
                // Gọi patient-service
                patient = webClientBuilder.build()
                        .get()
                        .uri("http://localhost:8083/patients/{id}", a.getPatientId())
                        .retrieve()
                        .bodyToMono(PatientDto.class)
                        .block();
            }

            return AppointmentResponse.builder()
                    .appointmentId(a.getAppointmentId())
                    .appointmentDate(a.getAppointmentDate())
                    .appointmentTime(a.getAppointmentTime())
                    .appointmentRoom(a.getAppointmentRoom())
                    .appointmentStatus(a.getAppointmentStatus())
                    .appointmentNote(a.getAppointmentNote())
                    .createdAt(a.getCreatedAt())
                    .updateAt(a.getUpdateAt())
                    .doctor(doctor)
                    .patient(patient)
                    .build();
        }).toList();
    }

    //Tạo lịch khám mới
    public Appointment createAppointment(AppointmentCreationRequest request) {
        Appointment appointment = Appointment.builder()
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .appointmentRoom(request.getAppointmentRoom())
                .appointmentStatus(request.getAppointmentStatus())
                .appointmentNote(request.getAppointmentNote())
                .doctorId(request.getDoctorId())
                .patientId(request.getPatientId())
                .build();

        return appointmentRepository.save(appointment);
    }

    // 🔹 Hàm tái sử dụng để build AppointmentResponse
//    private AppointmentResponse mapToResponse(Appointment a) {
//        // Gọi patient-service
//        PatientDto patient = webClientBuilder.build()
//                .get()
//                .uri("http://localhost:8083/patients/" + a.getPatientId())
//                .retrieve()
//                .bodyToMono(PatientDto.class)
//                .block();
//
//        // Gọi doctor-service
//        DoctorDto doctor = webClientBuilder.build()
//                .get()
//                .uri("http://localhost:8085/doctors/" + a.getDoctorId())
//                .retrieve()
//                .bodyToMono(DoctorDto.class)
//                .block();
//
//        return new AppointmentResponse(
//                String.valueOf(a.getAppointmentId()),
//                a.getAppointmentDate(),
//                a.getAppointmentTime(),
//                a.getAppointmentRoom(),
//                a.getAppointmentStatus(),
//                a.getAppointmentNote(),
//                a.getCreatedAt(),
//                patient,
//                doctor
//        );
//    }

    // sửa (update)
    public Appointment updateAppointment(Long id, Appointment updatedAppointment) {
        return appointmentRepository.findById(id)
                .map(appt -> {
                    appt.setAppointmentDate(updatedAppointment.getAppointmentDate());
                    appt.setAppointmentTime(updatedAppointment.getAppointmentTime());
                    appt.setAppointmentRoom(updatedAppointment.getAppointmentRoom());
                    appt.setAppointmentStatus(updatedAppointment.getAppointmentStatus());
                    appt.setAppointmentNote(updatedAppointment.getAppointmentNote());
                    appt.setDoctorId(updatedAppointment.getDoctorId());
                    appt.setPatientId(updatedAppointment.getPatientId());
                    return appointmentRepository.save(appt);
                })
                .orElseThrow(() -> new NoSuchElementException("Không tìm thấy lịch khám với id = " + id));
    }

    // xóa
    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new NoSuchElementException("Không tìm thấy lịch khám với id = " + id);
        }
        appointmentRepository.deleteById(id);
    }
}
