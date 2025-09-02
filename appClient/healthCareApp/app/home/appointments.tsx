import React, { useState, useEffect } from "react";
import AddAppointmentModal from "../../src/components/modal/appointment/addApointmentModal";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAppointmentsByPatient,
  createAppointment,
  NewAppointment,
} from "../../src/services/appointmentService";

// 🔹 Tạo type match backend
interface Appointment {
  appointmentId: string;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string | null;
  doctorId: string | null;
  appointmentRoom: string;
  specialty: string;
  appointmentStatus: string;
  appointmentNote: string;
  patientId: string;
  createdAt: string;
  updateAt: string;
}

export default function AppointmentList() {
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const patientId = await AsyncStorage.getItem("patientId");
        if (!patientId) {
          console.warn("Không tìm thấy patientId trong AsyncStorage");
          setMyAppointments([]);
          return;
        }
        const data = await getAppointmentsByPatient(patientId);
        setMyAppointments(data);
      } catch (err) {
        console.error("Lỗi khi tải lịch khám:", err);
        setMyAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={myAppointments}
          keyExtractor={(item) => item.appointmentId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { borderLeftColor: "#007AFF" }]}
              onPress={() => setSelected(item)}
            >
              <Text style={styles.date}>
                {item.appointmentDate} - {item.appointmentTime}
              </Text>
              <Text style={styles.name}>
                Phòng: {item.appointmentRoom}
              </Text>
              <Text style={styles.phone}>
                Bác sĩ: {item.doctorName || "Chưa có"}
              </Text>
              <Text style={styles.reason}>
                Chuyên khoa: {item.specialty}
              </Text>
              <Text style={styles.status}>
                Trạng thái: {item.appointmentStatus}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Bạn chưa có lịch khám nào</Text>
          }
        />
      )}

      {/* Modal chi tiết */}
      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chi tiết lịch khám</Text>
            {selected && (
              <>
                <Text>🕒 Ngày giờ: {selected.appointmentDate} - {selected.appointmentTime}</Text>
                <Text>📌 Trạng thái: {selected.appointmentStatus}</Text>
                <Text>🏥 Phòng: {selected.appointmentRoom}</Text>
                <Text>🩺 Bác sĩ: {selected.doctorName || "Chưa có"}</Text>
                <Text>📝 Ghi chú: {selected.appointmentNote}</Text>
                <Text>Chuyên khoa: {selected.specialty}</Text>
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

      {/* Modal thêm lịch */}
      <AddAppointmentModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={async (data) => {
          try {
            const patientId = await AsyncStorage.getItem("patientId");
            if (!patientId) return;
            const payload = { ...data, patientId }; // thêm patientId
            const saved = await createAppointment(payload);
            setMyAppointments((prev) => [...prev, saved]);
            setShowModal(false);
          } catch (err) {
            console.error("Không thể tạo lịch:", err);
          }
        }}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  headerText: { fontSize: 20, fontWeight: "600" },
  headerButton: { backgroundColor: "#007AFF", borderRadius: 20, width: 36, height: 36, justifyContent: "center", alignItems: "center" },
  headerButtonText: { color: "#fff", fontSize: 24, lineHeight: 24 },
  card: { backgroundColor: "#f0f8ff", padding: 16, borderRadius: 10, marginBottom: 12, borderLeftWidth: 4 },
  date: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  name: { fontSize: 15 },
  phone: { fontSize: 14 },
  reason: { fontSize: 14 },
  status: { fontSize: 14, color: "#007AFF", marginTop: 4 },
  empty: { textAlign: "center", marginTop: 40, color: "#999" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 12, width: "85%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  closeButton: { marginTop: 20, alignSelf: "flex-end" },
});
