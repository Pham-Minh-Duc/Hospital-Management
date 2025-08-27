package com.example.appointment_service.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Getter
@Setter
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String appointmentId;
    private String appointmentDate;
    private String appointmentTime;
    private String doctorName;
    private String doctorId;
    private String appointmentRoom;
    private String specialty;
    private String appointmentStatus;
    private String appointmentNote;

    private String patientId;

    @CreationTimestamp
    @Column(updatable = false)  // không cho phép giá trị của trường này thay đổi sau khi đã cập nhật lần đầu.
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updateAt;
}
