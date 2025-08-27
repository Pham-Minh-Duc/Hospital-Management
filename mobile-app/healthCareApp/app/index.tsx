import { Redirect } from "expo-router";
import { useAuthStore } from "../src/store/authStore";

export default function Index() {
  const { token } = useAuthStore();

  if (token) {
    return <Redirect href="/home" />;
  }
  return <Redirect href="/auth/login" />;
}
