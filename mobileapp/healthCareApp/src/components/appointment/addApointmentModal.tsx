import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

type NewAppointment = {
  name: string;
  age: string;
  phone: string;
  address: string;
  reason: string;
  datetime: string;
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: NewAppointment) => void;
}

export default function AddAppointmentModal({ visible, onClose, onSave }: Props) {
  const [form, setForm] = useState<NewAppointment>({
    name: "",
    age: "",
    phone: "",
    address: "",
    reason: "",
    datetime: "",
  });

  const handleChange = (key: keyof NewAppointment, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const isValid = Object.values(form).every((val) => val.trim() !== "");
    if (!isValid) return;
    onSave(form);
    setForm({
      name: "",
      age: "",
      phone: "",
      address: "",
      reason: "",
      datetime: "",
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Thêm lịch khám mới</Text>
          <ScrollView>
            <TextInput
              style={styles.input}
              placeholder="👤 Họ tên"
              value={form.name}
              onChangeText={(text) => handleChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="🎂 Tuổi"
              value={form.age}
              onChangeText={(text) => handleChange("age", text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="📞 Số điện thoại"
              value={form.phone}
              onChangeText={(text) => handleChange("phone", text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="🏠 Địa chỉ"
              value={form.address}
              onChangeText={(text) => handleChange("address", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="📝 Lý do khám"
              value={form.reason}
              onChangeText={(text) => handleChange("reason", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="🕒 Ngày giờ (VD: Thứ 5, 28/08/2025 - 09:30)"
              value={form.datetime}
              onChangeText={(text) => handleChange("datetime", text)}
            />
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <Text style={styles.save}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    maxHeight: "90%",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  cancel: { color: "#999", fontSize: 16 },
  save: { color: "#007AFF", fontSize: 16 },
});