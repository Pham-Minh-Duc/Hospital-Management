// src/components/modal/appointment/addApointmentModal.tsx
import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getAllSpecializations, getDoctorsBySpecialization } from "../../../services/doctorService";
import { NewAppointment } from "../../../services/appointmentService"; // IMPORT TYPE

interface AddAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: NewAppointment) => void; // send NewAppointment
}

export default function AddAppointmentModal({ visible, onClose, onSave }: AddAppointmentModalProps) {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentRoom, setAppointmentRoom] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");

  const [specializations, setSpecializations] = useState<any[]>([]);
  const [selectedSpecializationId, setSelectedSpecializationId] = useState<string>("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");

  const [loadingDoctors, setLoadingDoctors] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSpecializations();
        setSpecializations(data);
      } catch (err) {
        console.error("Lỗi khi load chuyên khoa:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!selectedSpecializationId) {
      setDoctors([]);
      setSelectedDoctorId("");
      return;
    }
    (async () => {
      setLoadingDoctors(true);
      try {
        // backend expects specialization id (string or number) -> we pass string
        const data = await getDoctorsBySpecialization(selectedSpecializationId);
        setDoctors(data);
      } catch (err) {
        console.error("Lỗi khi load bác sĩ:", err);
        setDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    })();
  }, [selectedSpecializationId]);

  const handleSave = () => {
    const payload: NewAppointment = {
      appointmentDate,
      appointmentTime,
      appointmentRoom,
      appointmentStatus: "waiting",
      appointmentNote,
      // patient filled by parent (AppointmentList) before calling createAppointment
      patient: { patientId: "" },
      doctor: selectedDoctorId ? {
        doctorId: selectedDoctorId,
        doctorName: null,
        specialization: {
          specializationId: selectedSpecializationId,
          specializationName: null
        }
      } : null
    };

    onSave(payload);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>🆕 Tạo lịch khám</Text>

          <TextInput style={styles.input} placeholder="Ngày khám (yyyy-mm-dd)" value={appointmentDate} onChangeText={setAppointmentDate} />
          <TextInput style={styles.input} placeholder="Giờ khám (HH:mm)" value={appointmentTime} onChangeText={setAppointmentTime} />
          <TextInput style={styles.input} placeholder="Phòng khám" value={appointmentRoom} onChangeText={setAppointmentRoom} />

          <Text style={styles.label}>Chuyên khoa</Text>
          <Picker selectedValue={selectedSpecializationId} onValueChange={(val) => setSelectedSpecializationId(val)} style={styles.picker}>
            <Picker.Item label="-- Chọn chuyên khoa --" value="" />
            {specializations.map((s) => (
              <Picker.Item key={s.specializationId} label={s.specializationName} value={String(s.specializationId)} />
            ))}
          </Picker>

          <Text style={styles.label}>Bác sĩ</Text>
          {loadingDoctors ? <ActivityIndicator size="small" /> : (
            <Picker selectedValue={selectedDoctorId} onValueChange={(val) => setSelectedDoctorId(val)} style={styles.picker}>
              <Picker.Item label="-- Chọn bác sĩ --" value="" />
              {doctors.map((d) => (
                <Picker.Item key={d.doctorId} label={d.doctorName} value={d.doctorId} />
              ))}
            </Picker>
          )}

          <TextInput style={styles.input} placeholder="Ghi chú" value={appointmentNote} onChangeText={setAppointmentNote} />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}><Text style={{color:"#999"}}>Hủy</Text></TouchableOpacity>
            <TouchableOpacity style={styles.save} onPress={handleSave}><Text style={{color:"#fff"}}>Lưu</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex:1, backgroundColor:"rgba(0,0,0,0.3)", justifyContent:"center", alignItems:"center" },
  modal: { backgroundColor:"#fff", padding:16, borderRadius:12, width:"90%" },
  title: { fontSize:18, fontWeight:"bold", marginBottom:12 },
  input: { borderWidth:1, borderColor:"#ddd", borderRadius:8, padding:10, marginBottom:12 },
  label: { fontWeight:"600", marginTop:10 },
  actions: { flexDirection:"row", justifyContent:"flex-end", marginTop:16 },
  cancel: { marginRight:16 },
  save: { backgroundColor:"#007AFF", paddingVertical:8, paddingHorizontal:16, borderRadius:8 },
  picker: { marginBottom:12 }
});
