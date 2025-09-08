const API_URL = "http://localhost:8080/patients";


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
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Sai tài khoản hoặc mật khẩu");
  }

  return await response.json(); // sẽ trả về { patientId, patientName, patientEmail }
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
