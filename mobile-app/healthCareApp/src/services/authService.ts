// Fake API login
export async function login(email: string, password: string) {
  if (email === "123" && password === "123") {
    return { token: "fake-jwt-token", user: { id: 1, name: "Đức" } };
  }
  throw new Error("Sai tài khoản hoặc mật khẩu");
}
