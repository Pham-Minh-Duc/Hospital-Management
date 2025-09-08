import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getAllSpecializations, getDoctorsBySpecialization } from "../../../services/doctorService";

interface AddAppointmentModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function AddAppointmentModal({
  visible,
  onClose,
  onSave,
}: AddAppointmentModalProps) {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentRoom, setAppointmentRoom] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");

  const [specializations, setSpecializations] = useState<any[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");

  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // load chuyên khoa
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

  // load bác sĩ khi chọn chuyên khoa
  useEffect(() => {
    if (!selectedSpecialization) return;
    (async () => {
      setLoadingDoctors(true);
      try {
        const data = await getDoctorsBySpecialization(selectedSpecialization);
        setDoctors(data);
      } catch (err) {
        console.error("Lỗi khi load bác sĩ:", err);
        setDoctors([]);
      } finally {
        setLoadingDoctors(false);
      }
    })();
  }, [selectedSpecialization]);

  const handleSave = () => {
    const newAppointment = {
      appointmentId: "",
      appointmentDate,
      appointmentTime,
      appointmentRoom,
      appointmentStatus: "Chờ xác nhận",
      appointmentNote,
      patient: { patientId: "" }, // sẽ gán trong AppointmentList
      doctor: {
        doctorId: selectedDoctor,
        doctorName: null,
        doctorSpecialization: selectedSpecialization,
      },
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };
    onSave(newAppointment);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>🆕 Tạo lịch khám</Text>

          <TextInput
            style={styles.input}
            placeholder="Ngày khám (yyyy-mm-dd)"
            value={appointmentDate}
            onChangeText={setAppointmentDate}
          />

          <TextInput
            style={styles.input}
            placeholder="Giờ khám (HH:mm)"
            value={appointmentTime}
            onChangeText={setAppointmentTime}
          />

          <TextInput
            style={styles.input}
            placeholder="Phòng khám"
            value={appointmentRoom}
            onChangeText={setAppointmentRoom}
          />

          {/* chọn chuyên khoa */}
          <Text style={styles.label}>Chuyên khoa</Text>
          <Picker
            selectedValue={selectedSpecialization}
            onValueChange={(val) => setSelectedSpecialization(val)}
          >
            <Picker.Item label="-- Chọn chuyên khoa --" value="" />
            {specializations.map((s) => (
              <Picker.Item
                key={s.specializationId}
                label={s.specializationName}
                value={s.specializationName}
              />
            ))}
          </Picker>

          {/* chọn bác sĩ */}
          <Text style={styles.label}>Bác sĩ</Text>
          {loadingDoctors ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Picker
              selectedValue={selectedDoctor}
              onValueChange={(val) => setSelectedDoctor(val)}
              enabled={doctors.length > 0}
            >
              <Picker.Item label="-- Chọn bác sĩ --" value="" />
              {doctors.map((d) => (
                <Picker.Item
                  key={d.doctorId}
                  label={d.doctorName}
                  value={d.doctorId}
                />
              ))}
            </Picker>
          )}

          <TextInput
            style={styles.input}
            placeholder="Ghi chú"
            value={appointmentNote}
            onChangeText={setAppointmentNote}
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={{ color: "#999" }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.save} onPress={handleSave}>
              <Text style={{ color: "#fff" }}>Lưu</Text>
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
    padding: 16,
    borderRadius: 12,
    width: "90%",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  label: { fontWeight: "600", marginTop: 10 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancel: { marginRight: 16 },
  save: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
