// src/services/appointmentService.ts
const API_URL = "http://localhost:8080/appointments";

export interface SpecializationDto {
  specializationId: string;
  specializationName?: string | null;
}

export interface DoctorDto {
  doctorId: string;
  doctorName?: string | null;
  specialization?: SpecializationDto | null;
}

export interface PatientRef {
  patientId: string;
}

export interface Appointment {
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentRoom: string;
  appointmentStatus: string;
  appointmentNote?: string;
  patient: PatientRef;
  doctor?: DoctorDto | null;
  createdAt?: string;
  updateAt?: string;
}

// Dữ liệu gửi khi tạo mới (server thường sinh id và timestamp)
export type NewAppointment = Omit<Appointment, "appointmentId" | "createdAt" | "updateAt">;

export async function getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
  const res = await fetch(`${API_URL}/${patientId}`, { cache: "no-store" });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Lỗi khi lấy danh sách lịch khám");
  }
  return res.json();
}

export async function createAppointment(data: NewAppointment): Promise<Appointment> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Không thể tạo lịch khám mới");
  }
  return res.json();
}
