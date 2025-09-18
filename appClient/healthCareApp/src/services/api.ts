

export function getApiEndpoints() {
  const API_URL = "http://192.168.1.24:8080";

  return {
    API_URL: API_URL,
    PATIENT_URL: `${API_URL}/patients`,
    APPOINTMENT_URL: `${API_URL}/appointments`,
    APPOINTMENT_ID_URL: `${API_URL}/appointments/patient`,
    DOCTOR_URL: `${API_URL}/doctors`
  };
}