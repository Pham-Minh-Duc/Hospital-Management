import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: Omit<NewAppointment, "patientId">) => void;
}

export interface NewAppointment {
  appointmentDate: string;
  appointmentTime: string;
  appointmentRoom: string;
  specialty: string;
  appointmentNote: string;
  patientId: string; // sẽ thêm tự động khi submit
}

export default function AddAppointmentModal({ visible, onClose, onSave }: Props) {
  const [form, setForm] = useState<Omit<NewAppointment, "patientId">>({
    appointmentDate: "",
    appointmentTime: "",
    appointmentRoom: "",
    specialty: "",
    appointmentNote: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const isValid = Object.values(form).every((val) => val.trim() !== "");
    if (!isValid) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin trước khi lưu.");
      return;
    }
    onSave(form); // patientId sẽ được thêm ở parent
    setForm({
      appointmentDate: "",
      appointmentTime: "",
      appointmentRoom: "",
      specialty: "",
      appointmentNote: "",
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Thêm lịch khám mới</Text>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="📅 Ngày khám (YYYY-MM-DD)"
              value={form.appointmentDate}
              onChangeText={(text) => handleChange("appointmentDate", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="⏰ Giờ khám (HH:mm)"
              value={form.appointmentTime}
              onChangeText={(text) => handleChange("appointmentTime", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="🏥 Phòng khám"
              value={form.appointmentRoom}
              onChangeText={(text) => handleChange("appointmentRoom", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="🩺 Chuyên khoa"
              value={form.specialty}
              onChangeText={(text) => handleChange("specialty", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="📝 Ghi chú"
              value={form.appointmentNote}
              onChangeText={(text) => handleChange("appointmentNote", text)}
            />
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancel}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
              <Text style={styles.save}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "#fff", padding: 20, borderRadius: 12, width: "90%", maxHeight: "90%" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 12 },
  buttonRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  cancelBtn: { flex: 1, marginRight: 10, padding: 12, borderRadius: 8, backgroundColor: "#eee", alignItems: "center" },
  saveBtn: { flex: 1, marginLeft: 10, padding: 12, borderRadius: 8, backgroundColor: "#007AFF", alignItems: "center" },
  cancel: { color: "#555", fontSize: 16 },
  save: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
