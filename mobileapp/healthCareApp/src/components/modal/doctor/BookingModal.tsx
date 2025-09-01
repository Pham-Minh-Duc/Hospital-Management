// BookingModal.tsx
import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface BookingModalProps {
  visible: boolean;
  doctorName: string;
  onClose: () => void;
  onSubmit: (data: BookingData) => void;
}

export type BookingData = {
  name: string;
  phone: string;
  email: string;
  dob: string;
  reason: string;
  preferredTime: string;
};

export default function BookingModal({ visible, doctorName, onClose, onSubmit }: BookingModalProps) {
  const router = useRouter();
  const [form, setForm] = useState<BookingData>({
    name: "",
    phone: "",
    email: "",
    dob: "",
    reason: "",
    preferredTime: "",
  });

  const handleChange = (key: keyof BookingData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = () => {
    const isValid = Object.values(form).every((val) => val.trim() !== "");
    if (!isValid) return;
    onSubmit(form);
    onClose();
    setForm({
      name: "",
      phone: "",
      email: "",
      dob: "",
      reason: "",
      preferredTime: "",
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Đặt lịch với {doctorName}</Text>
          <ScrollView>
            <TextInput style={styles.input} placeholder="👤 Họ tên" value={form.name} onChangeText={(text) => handleChange("name", text)} />
            <TextInput style={styles.input} placeholder="📞 Số điện thoại" value={form.phone} onChangeText={(text) => handleChange("phone", text)} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder="📧 Email" value={form.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="🎂 Ngày sinh (VD: 01/01/1990)" value={form.dob} onChangeText={(text) => handleChange("dob", text)} />
            <TextInput style={styles.input} placeholder="📝 Lý do khám" value={form.reason} onChangeText={(text) => handleChange("reason", text)} />
            <TextInput style={styles.input} placeholder="🕒 Thời gian mong muốn (VD: 14:00 - 15:00)" value={form.preferredTime} onChangeText={(text) => handleChange("preferredTime", text)} />
          </ScrollView>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    handleConfirm();
                    router.push("/home/appointments");
                    onClose();
                }}>
              <Text style={styles.confirm}>Xác nhận</Text>
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
  cancel: { color: "#999", fontSize: 16 },
  confirm: { color: "#007AFF", fontSize: 16 },
});