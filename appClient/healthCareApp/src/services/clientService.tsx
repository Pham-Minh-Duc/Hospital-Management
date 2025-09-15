import { getApiEndpoints } from "../services/api";

const PATIENT_URL = getApiEndpoints().PATIENT_URL;

const API_URL = PATIENT_URL;


export interface Patient {
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  patientPhone: string;
  patientEmail: string;
  patientGender?: string;
  patientBirthday?: string;
  patientAddress?: string;
  patientInsuranceNumber?: string;
  patientMedicalHistory?: string;
  patientAllergies?: string;
  patientNotes?: string;
}


export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Sai tài khoản hoặc mật khẩu");
  }

  return await response.json(); // sẽ trả về { patientId, patientName, patientEmail }
}

export async function register(patientName: string, patientEmail: string, patientPassword: string) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patientName, patientEmail, patientPassword }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Đăng ký thất bại");
  }

  return await res.json(); // backend trả về Patient JSON
}


export const getPatientById = async (id: string): Promise<Patient> => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Không tìm thấy bệnh nhân");
  return await res.json();
};

export async function updatePatient(id: string, data: Partial<Patient>): Promise<Patient> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Cập nhật thông tin bệnh nhân thất bại");
  }

  return res.json();
}
