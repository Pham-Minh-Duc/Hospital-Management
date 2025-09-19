package com.example.appointment_service.service;

import com.example.appointment_service.dto.DoctorDto;
import com.example.appointment_service.dto.PatientDto;
import com.example.appointment_service.dto.StatusUpdateDto;
import com.example.appointment_service.dto.response.AppointmentResponse;
import com.example.appointment_service.dto.request.AppointmentCreationRequest;
import com.example.appointment_service.entity.Appointment;
import com.example.appointment_service.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final WebClient.Builder webClientBuilder;

    // 🔹 Lấy danh sách lịch khám theo patientId
    public List<AppointmentResponse> getAppointmentsByPatientId(Long patientId) {
        List<Appointment> appointments = appointmentRepository.findByPatientId(patientId);

        return appointments.stream().map(a -> {
            // Gọi sang doctor-service
            DoctorDto doctor = webClientBuilder.build()
                    .get()
                    .uri("http://doctor-service/doctors/{id}", a.getDoctorId())
                    .retrieve()
                    .bodyToMono(DoctorDto.class)
                    .block(); // block() vì đang code sync

            // Gọi sang patient-service
            PatientDto patient = webClientBuilder.build()
                    .get()
                    .uri("http://patient-service/patients/{id}", a.getPatientId())
                    .retrieve()
                    .bodyToMono(PatientDto.class)
                    .block();

            return AppointmentResponse.builder()
                    .appointmentId(a.getAppointmentId())
                    .appointmentDate(a.getAppointmentDate())
                    .appointmentTime(a.getAppointmentTime())
                    .appointmentRoom(a.getAppointmentRoom())
                    .appointmentStatus(a.getAppointmentStatus())
                    .appointmentNote(a.getAppointmentNote())
                    .doctor(doctor)
                    .patient(patient)
                    .createdAt(a.getCreatedAt())
                    .updateAt(a.getUpdateAt())
                    .build();
        }).toList();
    }


    // 🔹 Lấy tất cả lịch khám
    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(a -> {
            DoctorDto doctor = null;
            PatientDto patient = null;
            if (a.getDoctorId() != null){
                // Gọi doctor-service
                doctor = webClientBuilder.build()
                        .get()
                        .uri("http://doctor-service/doctors/{id}", a.getDoctorId())
                        .retrieve()
                        .bodyToMono(DoctorDto.class)
                        .block();
            }
            if(a.getPatientId() != null) {
                // Gọi patient-service
                patient = webClientBuilder.build()
                        .get()
                        .uri("http://patient-service/patients/{id}", a.getPatientId())
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

    // cập nhật trạng thái
    public StatusUpdateDto updateStatus(Long id, StatusUpdateDto request){
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("không tìm thấy lịch khám của bệnh nhân có id: " + id));
        appointment.setAppointmentStatus(request.getAppointmentStatus());
        appointment.setUpdateAt(LocalDateTime.now());

        appointmentRepository.save(appointment);

        return new StatusUpdateDto(appointment.getAppointmentStatus());
    }
}
