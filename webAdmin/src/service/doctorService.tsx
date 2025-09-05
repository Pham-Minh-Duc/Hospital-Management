const API_URL = "http://localhost:8080/doctors";

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
  doctorExperienceYears: number;
  doctorStatus: string;
}


export async function getAllDoctors(): Promise<Doctor[]> {
  const res = await fetch(API_URL, { cache: "no-store" }); // luôn fetch mới
  if (!res.ok) {
    throw new Error("Không thể tải danh sách lịch khám");
  }
  return res.json();
}

export async function createDoctor(doctor: Omit<Doctor, "doctorId">): Promise<Doctor>{
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json"},
    body: JSON.stringify(doctor),
  });
  if(!res.ok){
    const errText = await res.text();
    throw new Error("Không thể thêm bác sĩ: " + errText);
  }

  return res.json();
}

export async function deleteDoctor(id: string) {
  const res = await fetch(`http://localhost:8080/doctors/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Xóa bác sĩ thất bại");
  }
  return true;
}
