const API_URL = "http://localhost:8080/appointments";

// services/appointmentService.ts
export interface Appointment {
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentRoom: string;
  appointmentStatus: string;
  appointmentNote: string;
  patient: {
    patientId: string;
    patientName?: string;   // nếu API trả kèm
    patientEmail?: string;         // nếu API trả kèm
  };
  doctor: {
    doctorId: string | null;
    doctorName: string | null;
    doctorSpecialization: string;
  };
  createdAt: string;
  updateAt: string;
}



export async function getAllAppointments(): Promise<Appointment[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Không thể tải danh sách lịch khám");
  }
  return res.json();
}
