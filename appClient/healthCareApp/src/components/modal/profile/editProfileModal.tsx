import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { getPatientById, updatePatient, Patient } from "@/src/services/clientService";

interface EditProfileModalProps {
  visible: boolean;
  patient?: Patient;                         // optional: dùng để prefill nếu có
  onClose: () => void;
  onSuccess: (updated: Patient) => void;     // yêu cầu truyền Patient ra ngoài
}

const EditProfileModal = ({ visible, patient, onClose, onSuccess }: EditProfileModalProps) => {
  const [formData, setFormData] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(false);

  // Prefill từ props.patient nếu có; nếu không thì load theo id trong AsyncStorage
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patient) {
          setFormData(patient);
          return;
        }
        const storedId = await AsyncStorage.getItem("patientId");
        if (!storedId) return;
        const data = await getPatientById(storedId);
        setFormData(data);
      } catch (err) {
        console.error("Lỗi khi load bệnh nhân:", err);
      }
    };

    if (visible) fetchPatient();
  }, [visible, patient]);

  const handleChange = (key: keyof Patient, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    if (!formData) return;
    try {
      setLoading(true);
      // ❗ Service nên trả về Patient đã cập nhật
      const updated = await updatePatient(formData.patientId, formData);
      Alert.alert("✅ Thành công", "Cập nhật thông tin cá nhân thành công!");
      onSuccess(updated);   // ✅ truyền Patient ra ngoài
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert("❌ Lỗi", "Không thể cập nhật thông tin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>✏️ Chỉnh sửa thông tin cá nhân</Text>

          {!formData ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Họ tên"
                value={formData.patientName || ""}
                onChangeText={(text) => handleChange("patientName", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={formData.patientPhone || ""}
                onChangeText={(text) => handleChange("patientPhone", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={formData.patientEmail || ""}
                onChangeText={(text) => handleChange("patientEmail", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Giới tính"
                value={formData.patientGender || ""}
                onChangeText={(text) => handleChange("patientGender", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Ngày sinh"
                value={formData.patientBirthday || ""}
                onChangeText={(text) => handleChange("patientBirthday", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={formData.patientAddress || ""}
                onChangeText={(text) => handleChange("patientAddress", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Số BHYT"
                value={formData.patientInsuranceNumber || ""}
                onChangeText={(text) => handleChange("patientInsuranceNumber", text)}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelBtn} onPress={onClose} disabled={loading}>
                  <Text style={styles.btnText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit} disabled={loading}>
                  <Text style={styles.btnText}>{loading ? "Đang lưu..." : "Lưu"}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalContainer: { backgroundColor: "white", padding: 20, borderRadius: 12, width: "90%" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, marginBottom: 10 },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10 },
  cancelBtn: { backgroundColor: "gray", padding: 10, borderRadius: 8, marginRight: 10 },
  saveBtn: { backgroundColor: "#007bff", padding: 10, borderRadius: 8 },
  btnText: { color: "white", fontWeight: "bold" },
});
