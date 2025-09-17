import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../src/store/authStore";
import { login, register } from "../../src/services/clientService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // modal state
  const [showRegister, setShowRegister] = useState(false);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");

const handleLogin = async () => {
  try {
    const res = await login(email, password);

    console.log("Login response:", res);

    // Lưu vào Zustand
    setAuth(null, {
      id: res.id,
      name: res.name,
    });

    // Lưu vào AsyncStorage
    await AsyncStorage.setItem("patientId", res.id.toString());
    await AsyncStorage.setItem("patientName", res.name);

    router.replace("/home");
  } catch (e: any) {
    setError(e.message || "Đăng nhập thất bại");
  }
};

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPassword) {
      setRegError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    try {
      await register(regName, regEmail, regPassword);
      Alert.alert("Thành công", "Đăng ký thành công! Hãy đăng nhập.");
      setShowRegister(false);
      // reset form
      setRegName("");
      setRegEmail("");
      setRegPassword("");
      setRegError("");
    } catch (e: any) {
      setRegError(e.message || "Đăng ký thất bại");
    }
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

      <TouchableOpacity
        style={[styles.button, { marginTop: 10, backgroundColor: "#555" }]}
        onPress={() => setShowRegister(true)}
      >
        <Text style={styles.buttonText}>Đăng kí</Text>
      </TouchableOpacity>

      {/* Modal Đăng ký */}
      <Modal visible={showRegister} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Đăng kí</Text>
            {regError ? <Text style={styles.error}>{regError}</Text> : null}

            <TextInput
              placeholder="Họ tên"
              value={regName}
              onChangeText={setRegName}
              style={styles.input}
            />
            <TextInput
              placeholder="Email"
              value={regEmail}
              onChangeText={setRegEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Mật khẩu"
              value={regPassword}
              onChangeText={setRegPassword}
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { marginTop: 10, backgroundColor: "#999" }]}
              onPress={() => setShowRegister(false)}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
});
