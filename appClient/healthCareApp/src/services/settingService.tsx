import { getApiEndpoints } from "../services/api";

const PATIENT_URL = getApiEndpoints().PATIENT_URL;

const API_URL = PATIENT_URL;

// patientApi.ts
export async function changePassword(patientId: number, oldPass: string, newPass: string) {
  const res = await fetch(`${API_URL}/${patientId}/change-password`, {
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

