const API_URL = "http://localhost:8080/doctors";
const SPECIALIZATION_URL = "http://localhost:8080/specializations";

// ===================== KIỂU DỮ LIỆU =====================

// Backend trả về DTO bác sĩ
interface DoctorResponse {
  doctorId: number | string;
  doctorName: string;
  doctorGender: string;
  doctorDob: string;
  doctorPhone: string;
  doctorEmail: string;
  doctorPosition: string;
  doctorQualification: string;
  doctorSpecializationName?: string; // backend trả về
  doctorExperienceYears: number;
  doctorStatus: string;
}

// Interface cho request tạo / cập nhật bác sĩ
export interface DoctorRequest {
  doctorName: string;
  doctorGender: string;
  doctorDob: string;
  doctorPhone: string;
  doctorEmail: string;
  doctorPosition: string;
  doctorQualification: string;
  specializationId: number; // ✅ id chuyên khoa
  doctorExperienceYears: number;
  doctorStatus: string;
}

// Interface frontend bác sĩ
export interface Doctor {
  doctorId: string;
  doctorName: string;
  doctorGender: string;
  doctorDob: string;
  doctorPhone: string;
  doctorEmail: string;
  doctorPosition: string;
  doctorQualification: string;
  specializationId?: number; // lưu id khi chọn
  doctorSpecialization: string; // chỉ lấy tên
  doctorExperienceYears: number;
  doctorStatus: string;
}

// Backend trả về DTO chuyên khoa
export interface SpecializationResponse {
  specializationId: number | string;
  specializationName: string;
}

// Interface frontend chuyên khoa
export interface Specialization {
  specializationId: number;
  specializationName: string;
}

// ===================== DOCTOR API =====================

// Lấy tất cả bác sĩ
export async function getAllDoctors(): Promise<Doctor[]> {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Không thể tải danh sách bác sĩ");
  }

  const data: DoctorResponse[] = await res.json();

  return data.map((doc) => ({
    doctorId: String(doc.doctorId), // convert sang string
    doctorName: doc.doctorName,
    doctorGender: doc.doctorGender,
    doctorDob: doc.doctorDob,
    doctorPhone: doc.doctorPhone,
    doctorEmail: doc.doctorEmail,
    doctorPosition: doc.doctorPosition,
    doctorQualification: doc.doctorQualification,
    doctorSpecialization: doc.doctorSpecializationName || "",
    doctorExperienceYears: doc.doctorExperienceYears,
    doctorStatus: doc.doctorStatus,
  }));
}

// Thêm bác sĩ
export async function createDoctor(doctor: DoctorRequest): Promise<Doctor> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doctor),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Không thể thêm bác sĩ: " + errText);
  }
  return res.json();
}

// Xoá bác sĩ
export async function deleteDoctor(doctorId: number | string): Promise<string> {
  const response = await fetch(`${API_URL}/${doctorId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Không thể xoá bác sĩ");
  }

  return response.text();
}

// Cập nhật bác sĩ
export async function updateDoctor(
  doctorId: number | string,
  doctor: DoctorRequest
): Promise<Doctor> {
  const response = await fetch(`${API_URL}/${doctorId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error("Không thể cập nhật bác sĩ: " + errText);
  }

  return response.json();
}

// ===================== SPECIALIZATION API =====================

// Lấy danh sách chuyên khoa
export async function getAllSpecializations(): Promise<Specialization[]> {
  const res = await fetch(SPECIALIZATION_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Không thể tải danh sách chuyên khoa");
  }

  const data: SpecializationResponse[] = await res.json();
  return data.map((sp) => ({
    specializationId: Number(sp.specializationId),
    specializationName: sp.specializationName,
  }));
}
