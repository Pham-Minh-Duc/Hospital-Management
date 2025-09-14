const PATIENT_URL = "http://localhost:8080/patients";

// patientApi.ts
export async function changePassword(patientId: number, oldPass: string, newPass: string) {
  const res = await fetch(`${PATIENT_URL}/${patientId}/change-password`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      patientOldPassword: oldPass,
      patientNewPassword: newPass,
    }),
  });

  const text = await res.text();
  if (!res.ok) throw new Error(text || "Đổi mật khẩu thất bại");
  return text;
}

