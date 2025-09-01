import React, { useState } from "react";
import AddAppointmentModal from "../../src/components/modal/appointment/addApointmentModal";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

// ✅ Kiểu dữ liệu đầy đủ cho lịch khám
interface Appointment {
  id: string;
  name: string;
  age: string;
  phone: string;
  address: string;
  reason: string;
  date: string;
  time: string;
  status: string;
}

// ✅ Kiểu dữ liệu khi thêm mới
type NewAppointment = Omit<Appointment, "id" | "date" | "time" | "status"> & {
  datetime: string;
};

export default function AppointmentList() {
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);

  const handleAdd = (data: NewAppointment) => {
    const [date, time] = data.datetime.split(" - ");

    const newItem: Appointment = {
      id: Date.now().toString(),
      name: data.name,
      age: data.age,
      phone: data.phone,
      address: data.address,
      reason: data.reason,
      date: date || "",
      time: time || "",
      status: "Chờ xác nhận",
    };

    setMyAppointments((prev) => [...prev, newItem]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>📅 Lịch khám của tôi</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.headerButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={myAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { borderLeftColor: "#007AFF" }]}
            onPress={() => setSelected(item)}
          >
            <Text style={styles.date}>
              {item.date} - {item.time}
            </Text>
            <Text style={styles.name}>Họ và tên: {item.name} ({item.age} tuổi)</Text>
            <Text style={styles.phone}>Số điện thoại: {item.phone}</Text>
            <Text style={styles.reason}>Lí do khám/ ghi chú: {item.reason}</Text>
            <Text style={styles.status}>Trạng thái: {item.status}</Text>
            <Text style={styles.status}>Ngày đặt lịch: </Text>
            <Text style={styles.status}>khi xác nhận lịch khám từ admin thì thêm trường: phòng khám, tên bác sĩ, chuyên khoa</Text>
            <Text style={styles.status}>Thời gian khám:</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Bạn chưa có lịch khám nào</Text>
        }
      />

      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chi tiết lịch khám</Text>
            {selected && (
              <>
                <Text>👤 Họ tên: {selected.name}</Text>
                <Text>🎂 Tuổi: {selected.age}</Text>
                <Text>📞 SĐT: {selected.phone}</Text>
                <Text>🏠 Địa chỉ: {selected.address}</Text>
                <Text>📝 Lý do: {selected.reason}</Text>
                <Text>🕒 Thời gian: {selected.date} - {selected.time}</Text>
                <Text>📌 Trạng thái: {selected.status}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelected(null)}
            >
              <Text style={{ color: "#007AFF" }}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <AddAppointmentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: { fontSize: 20, fontWeight: "600" },
  headerButton: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonText: { color: "#fff", fontSize: 24, lineHeight: 24 },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  date: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  name: { fontSize: 15 },
  phone: { fontSize: 14 },
  reason: { fontSize: 14 },
  status: { fontSize: 14, color: "#007AFF", marginTop: 4 },
  empty: { textAlign: "center", marginTop: 40, color: "#999" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "85%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  closeButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
});