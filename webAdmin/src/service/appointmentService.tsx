const API_URL = "http://localhost:8080/appointments";

// services/appointmentService.ts
export interface Appointment {
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string | null;
  doctorId: string | null;
  appointmentRoom: string;
  specialty: string;
  appointmentStatus: string;
  appointmentNote: string;
  patientId: string;
  patientName?: string;   // nếu API trả kèm
  email?: string;         // nếu API trả kèm
  createdAt: string;
  updateAt: string;
}



export async function getAllAppointments(): Promise<Appointment[]> {
  const res = await fetch(API_URL, { cache: "no-store" }); // luôn fetch mới
  if (!res.ok) {
    throw new Error("Không thể tải danh sách lịch khám");
  }
  return res.json();
}
