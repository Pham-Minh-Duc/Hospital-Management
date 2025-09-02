const API_URL = "http://localhost:8080/appointments"; 


// src/services/appointmentService.ts

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
  createdAt: string;
  updateAt: string;
}

// Khi tạo lịch mới
export interface NewAppointment {
  patientId: string; // 🔹 bắt buộc gửi patientId
  appointmentDate: string;
  appointmentTime: string;
  appointmentRoom: string;
  specialty: string;
  appointmentNote: string;
}




// Lấy danh sách lịch khám theo patientId
export async function getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
  const res = await fetch(`${API_URL}/${patientId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Không thể tải danh sách lịch khám của bệnh nhân");
  }

  const data = await res.json();
  return data as Appointment[];
}

// Lấy chi tiết lịch khám theo appointmentId
export async function getAppointmentById(appointmentId: string): Promise<Appointment> {
  const res = await fetch(`${API_URL}/detail/${appointmentId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Không thể tải lịch khám ID=${appointmentId}`);
  }

  return res.json() as Promise<Appointment>;
}

// Tạo lịch khám mới
export async function createAppointment(data: NewAppointment): Promise<Appointment> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error("Không thể tạo lịch khám mới: " + error);
  }

  const result = await res.json();
  return result as Appointment;
}

