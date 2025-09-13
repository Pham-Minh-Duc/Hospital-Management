package com.example.appointment_service.entity;

import com.example.patient_service.entity.Patient;
import com.example.doctor_service.entity.Doctor;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private String appointmentRoom;
    private String appointmentStatus;
    private String appointmentNote;

    private Long doctorId;   // chỉ lưu ID bác sĩ
    private Long patientId;

    @CreationTimestamp
    @Column(updatable = false)  // không cho phép giá trị của trường này thay đổi sau khi đã cập nhật lần đầu.
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updateAt;
}
