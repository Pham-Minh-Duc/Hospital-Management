const API_URL = "http://localhost:8080/appointments";
const SPECIALIZATIONS_URL = "http://localhost:8080/specializations";
const DOCTOR_URL = "http://localhost:8080/doctors";

// services/appointmentService.ts
// services/appointmentService.ts
export interface Appointment {
  appointmentId: number;
  appointmentDate: string;
  appointmentTime: string;
  appointmentRoom: string;
  appointmentStatus: string;
  appointmentNote: string;
  patient: {
    patientId: number;
    patientName?: string;
    patientEmail?: string;
  };
  doctor: {
    doctorId: number;
    doctorName: string | null;
    doctorSpecialization: {
      specializationId: number;
      specializationName: string;
    } | null;
  }
  createdAt: string;
  updateAt: string;
}
// Interface cho request khi thêm mới
export interface AppointmentRequest {
  appointmentDate: string;   // "2025-09-20"
  appointmentTime: string;   // "09:30:00"
  appointmentRoom: string;
  appointmentStatus: string;
  appointmentNote: string;
  doctorId: number;          // chỉ gửi id
  patientId: number;         // chỉ gửi id
}

export interface Specialization {
  specializationId: number;
  specializationName: string;
}

export interface Doctor {
  doctorId: number;
  doctorName: string;
}

export interface DoctorOption {
  doctorId: string;   // string để dùng cho Select
  doctorName: string;
}

// Interface đúng theo API /patients trả về
export interface Patient {
  patientId: number;
  patientName: string;
  // nếu API còn field khác (email, phone, ...) thì thêm vào
  email?: string;
  phone?: string;
}

export interface PatientOption {
  patientId: string;
  patientName: string;
}

// gọi danh sách lịch khám
export async function getAllAppointments(): Promise<Appointment[]> {
  const res = await fetch(`${API_URL}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Không thể tải danh sách lịch khám");
  }
  return res.json();
}
// Tạo lịch khám mới
export async function createAppointment(
  appointment: AppointmentRequest
): Promise<Appointment> {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });

  if (!res.ok) {
    throw new Error("Không thể tạo lịch khám mới");
  }

  return res.json();
}


// --- API lấy danh sách chuyên khoa ---
export async function getAllSpecializations(): Promise<Specialization[]> {
  const res = await fetch(SPECIALIZATIONS_URL);
  if (!res.ok) {
    throw new Error("Không thể tải danh sách chuyên khoa");
  }
  return res.json();
}

// --- API lấy danh sách bác sĩ theo chuyên khoa ---
export async function getDoctorsBySpecialization(
  specializationId: number
): Promise<DoctorOption[]> {
  const res = await fetch(`${DOCTOR_URL}/by-specialization/${specializationId}`);
  if (!res.ok) throw new Error("Không thể tải danh sách bác sĩ");

  const data: { doctorId: number; doctorName: string | null }[] = await res.json();
  console.log("API trả về doctors:", data);

  return data.map(d => ({
    doctorId: String(d.doctorId),
    doctorName: d.doctorName || "Chưa có tên",
  }));
}


// --- API lấy danh sách bệnh nhân ---
export async function getAllPatients(): Promise<PatientOption[]> {
  const res = await fetch("http://localhost:8080/patients");
  if (!res.ok) throw new Error("Không thể tải danh sách bệnh nhân");

  const data: Patient[] = await res.json();

  return data.map((p) => ({
    patientId: String(p.patientId),
    patientName: p.patientName || "Chưa có tên",
  }));
}


// Xóa lịch khám
export async function deleteAppointment(id: number) {
  const res = await fetch(`http://localhost:8080/appointments/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Không thể xóa lịch khám");
}

// Cập nhật lịch khám
export async function updateAppointment(id: number, payload: AppointmentRequest) {
  const res = await fetch(`http://localhost:8080/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Không thể cập nhật lịch khám");
  return res.json();
}



