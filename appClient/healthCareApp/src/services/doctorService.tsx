// services/doctorService.ts
export const fetchDoctors = async () => {
  const response = await fetch('http://localhost:8080/doctors');
  if (!response.ok) throw new Error('Lỗi khi gọi API lấy danh sách bác sĩ');
  return await response.json();
};