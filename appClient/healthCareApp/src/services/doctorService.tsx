const API_URL = 'http://localhost:8080/doctors';
const API_BASE = "http://localhost:8080";

export interface Doctor {
  doctorId: string;
  doctorName: string;
  doctorGender: string;
  doctorDob: string;
  doctorPhone: string;
  doctorEmail: string;
  doctorDepartment: string;
  doctorPosition: string;
  doctorQualification: string;
  doctorSpecialization: string;
  doctorStatus: string;
  doctorExperienceYears: string;
}

export const fetchDoctors = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) throw new Error('Lỗi khi gọi API lấy danh sách bác sĩ');
  return await response.json();
};

export async function getDoctorsBySpecialization(specializationId: string) {
  const res = await fetch(`${API_URL}?specializationId=${specializationId}`);
  if (!res.ok) {
    throw new Error("Lỗi khi lấy danh sách bác sĩ");
  }
  return res.json();
}


export async function getAllSpecializations() {
  const res = await fetch(`${API_BASE}/specializations`);
  if (!res.ok) throw new Error("Không thể tải danh sách chuyên khoa");
  return await res.json();
}

