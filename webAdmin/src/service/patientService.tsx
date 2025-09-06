const API_URL = "http://localhost:8080/patients";

export interface Patient {
  patientId: string
  patientName: string
  patientPhone: string
  patientEmail: string
  patientGender: string
  patientBirthday: string
  patientAddress: string
  patientInsuranceNumber: string
}

export async function getAllPatients(): Promise<Patient[]> {
  const res = await fetch(API_URL, { cache: "no-store" }); // luôn fetch mới
  if (!res.ok) {
    throw new Error("Không thể tải danh sách lịch khám");
  }
  return res.json();
}

export async function createPatient(patient: Omit<Patient, "patientId">): Promise<Patient> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patient),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error("Không thể thêm bệnh nhân: " + errText);
  }
  return res.json();
}

export async function deletePatient(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if(!res.ok) {
    throw new Error("Xóa bệnh nhân thất bại");
  }
  return true;
}

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
