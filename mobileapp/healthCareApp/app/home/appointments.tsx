import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";

// ✅ Kiểu dữ liệu cho lịch khám
interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  hospital: string;
  location: string;
  status: string;
}

// 🗓️ Dữ liệu mẫu
const appointments: Appointment[] = [
  {
    id: "1",
    date: "Thứ 5, 28/08/2025",
    time: "09:30",
    doctor: "BS. Trần Thị C",
    specialty: "Nhi khoa",
    hospital: "BV Nhi TW",
    location: "Phòng khám số 3",
    status: "Đã xác nhận",
  },
  {
    id: "2",
    date: "Thứ 6, 29/08/2025",
    time: "14:00",
    doctor: "BS. Phạm Văn E",
    specialty: "Tim mạch",
    hospital: "BV 108",
    location: "Tầng 2, khu A",
    status: "Chờ xác nhận",
  },
  {
    id: "3",
    date: "Thứ 7, 30/08/2025",
    time: "10:00",
    doctor: "BS. Nguyễn Văn A",
    specialty: "Da liễu",
    hospital: "BV Da Liễu",
    location: "Phòng 101",
    status: "Đã hủy",
  },
];

export default function AppointmentList() {
  const [selected, setSelected] = useState<Appointment | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 Lịch khám của tôi</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const borderColor =
            item.status === "Đã xác nhận"
              ? "#32CD32" // xanh lá
              : item.status === "Chờ xác nhận"
              ? "#FFD700" // vàng
              : "#ccc";   // mặc định

          return (
            <TouchableOpacity
              style={[styles.card, { borderLeftColor: borderColor }]}
              onPress={() => setSelected(item)}
            >
              <Text style={styles.date}>{item.date} - {item.time}</Text>
              <Text style={styles.doctor}>{item.doctor} - {item.specialty}</Text>
              <Text style={styles.hospital}>{item.hospital}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>Bạn chưa có lịch khám nào</Text>
        }
      />

      {/* 🔍 Modal chi tiết lịch khám */}
      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chi tiết lịch khám</Text>
            {selected && (
              <>
                <Text>👨‍⚕️ Bác sĩ: {selected.doctor}</Text>
                <Text>🕒 Thời gian: {selected.date} - {selected.time}</Text>
                <Text>🏥 Bệnh viện: {selected.hospital}</Text>
                <Text>📍 Địa điểm: {selected.location}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ccc", // mặc định, sẽ bị override
  },
  date: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  doctor: { fontSize: 15 },
  hospital: { fontSize: 14, color: "#555" },
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
    width: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  closeButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
});