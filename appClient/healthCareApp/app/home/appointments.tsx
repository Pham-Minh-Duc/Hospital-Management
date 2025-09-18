// src/screens/AppointmentList.tsx (hoặc file của bạn)
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddAppointmentModal from "../../src/components/modal/appointment/addApointmentModal";
import { Appointment, NewAppointment, getAppointmentsByPatient, createAppointment } from "../../src/services/appointmentService";

export default function AppointmentList() {
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const patientId = await AsyncStorage.getItem("patientId");
        if (!patientId) { setMyAppointments([]); return; }
        const data = await getAppointmentsByPatient(patientId);
        setMyAppointments(data);
      } catch (err) {
        console.error(err);
        setMyAppointments([]);
      } finally { setLoading(false); }
    })();
  }, []);

  const handleSaveFromModal = async (data: NewAppointment) => {
    try {
      const patientId = localStorage.getItem("patientId"); // ✅ lấy từ localStorage
      if (!patientId) {
        console.warn("Không tìm thấy patientId trong localStorage");
        return;
      }

      const payload: NewAppointment = {
        ...data,
        patient: { patientId } // gán lại đúng patientId
      };

      const saved = await createAppointment(payload);
      setMyAppointments(prev => [...prev, saved]);
      setShowModal(false);
    } catch (err) {
      console.error("Không thể tạo lịch:", err);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>📅 Lịch khám của tôi</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => setShowModal(true)}>
          <Text style={styles.headerButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      {loading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={myAppointments}
          keyExtractor={(i) => String(i.appointmentId)}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.card} onPress={() => setSelected(item)}>
              <View style={styles.cardRow}>
                <View style={{flex: 1}}>
                  <Text>{item.appointmentDate} - {item.appointmentTime}</Text>
                  <Text>Phòng: {item.appointmentRoom}</Text>
                  <Text>Bác sĩ: {item.doctor?.doctorName ?? "Chưa có"}</Text>
                  <Text>Chuyên khoa: {item.doctor?.doctorSpecialization?.specializationName ?? "Chưa có"}</Text>
                </View>
                <View>
                  <Text style={[
                    styles.statusText,
                    item.appointmentStatus === "canceled" && {color: "red"},
                    item.appointmentStatus === "confirmed" && {color: "green"},
                    item.appointmentStatus === "waiting" && {color: "orange"},
                  ]}>
                    {item.appointmentStatus}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={{textAlign:"center", marginTop:40}}>Bạn chưa có lịch khám nào</Text>}
        />
      )}

      <AddAppointmentModal visible={showModal} onClose={() => setShowModal(false)} onSave={handleSaveFromModal} />
      <Modal visible={!!selected} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selected && (
              <>
                <Text>🕒 Ngày giờ: {selected.appointmentDate} - {selected.appointmentTime}</Text>
                <Text>🩺 Bác sĩ: {selected.doctor?.doctorName ?? "Chưa có"}</Text>
                <Text>Chuyên khoa: {selected.doctor?.doctorSpecialization?.specializationName ?? "Chưa có"}</Text>
                <Text>Ghi chú: {selected.appointmentNote}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => setSelected(null)}><Text style={{color:"#007AFF", marginTop:12}}>Đóng</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:"#fff" },
  headerRow: { flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:16 },
  headerText: { fontSize:20, fontWeight:"600" },
  headerButton: { backgroundColor:"#007AFF", borderRadius:20, width:36, height:36, justifyContent:"center", alignItems:"center" },
  headerButtonText: { color:"#fff", fontSize:24 },
  card: { backgroundColor:"#f0f8ff", padding:12, borderRadius:8, marginBottom:10 },
  modalOverlay: { flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"rgba(0,0,0,0.3)" },
  modalContent: { backgroundColor:"#fff", padding:16, borderRadius:8, width:"85%" },
  cardRow: { flexDirection:"row", justifyContent:"space-between",alignItems:"center"},
  statusText: { fontWeight: "600", textTransform: "capitalize"}
});
