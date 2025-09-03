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

// lấy danh sách lịch khám theo từng client.
    public List<Appointment> getAppointmentsByPatient(String patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }


// lấy danh sách lịch khám của tất cả client
public List<AppointmentResponse> getAllAppointmentsWithPatient() {
    List<Appointment> appointments = appointmentRepository.findAll();

    return appointments.stream().map(appointment ->
            new AppointmentResponse(
                    appointment.getAppointmentId(),
                    appointment.getAppointmentDate(),
                    appointment.getAppointmentTime(),
                    appointment.getAppointmentRoom(),
                    appointment.getSpecialty(),
                    appointment.getAppointmentStatus(),
                    appointment.getAppointmentNote(),
                    appointment.getCreatedAt(),
                    appointment.getDoctorId(),
                    null,
                    appointment.getPatientId(),
                    null,
                    null
            )
    ).collect(Collectors.toList());
}


    //tạo lịch khám theo id
    public Appointment createAppointment(AppointmentCreationRequest request) {
        Appointment appointment = new Appointment();
        appointment.setPatientId(request.getPatientId());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setAppointmentRoom(request.getAppointmentRoom());
        appointment.setSpecialty(request.getSpecialty());
        appointment.setAppointmentNote(request.getAppointmentNote());
        appointment.setAppointmentStatus("Chờ xác nhận"); // default status
        return appointmentRepository.save(appointment);
    }

}
