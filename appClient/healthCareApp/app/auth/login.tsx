import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../src/store/authStore";
import { login } from "../../src/services/clientService";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 👈 import thêm

export default function LoginScreen() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleLogin = async () => {
  try {
    const res = await login(email, password);
    // backend trả về { patientId, patientName, patientEmail }

    // Lưu vào Zustand store
    setAuth(null, {
      id: res.patientId,
      name: res.patientName,
    });

    router.replace("/home"); // chuyển sang home

    // Lưu patientId + patientName vào AsyncStorage
    await AsyncStorage.setItem("patientId", res.id.toString());
    await AsyncStorage.setItem("patientName", res.name);


  } catch (e: any) {
    setError(e.message || "Đăng nhập thất bại");
  }
};

  const handleRegister = () => {
    // TODO: viết sau
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={"#999"}
      />

      <TextInput
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholderTextColor={"#999"}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng kí</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f0f4ff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  error: { color: "red", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2a52be",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
