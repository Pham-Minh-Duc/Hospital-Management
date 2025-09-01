
// // services/doctorService.ts
// export const loginClient = async () => {
//   const response = await fetch('http://localhost:8080/patients/login');
//   if (!response.ok) throw new Error('Lỗi khi gọi API login patients');
//   return await response.json();
// };

// services/clientService.ts
export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:8080/patients/login", {
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
