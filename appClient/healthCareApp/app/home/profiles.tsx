import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Patient, getPatientById } from "../../src/services/clientService";
import EditProfileModal from "../../src/components/modal/profile/editProfileModal";

export default function Profile() {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [patient, setPatient] = useState<Patient | null>(null);

//load dữ liệu khi load trang
    useEffect(() => {
      const storedId = localStorage.getItem("patientId");
      if (!storedId) return; // Nếu chưa có ID thì không gọi API
      const fetchPatient = async () => {
        try {
          const data = await getPatientById(storedId);
          setPatient(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchPatient();
    }, []);

  if (!patient) {
    return <p>⏳ Đang tải dữ liệu bệnh nhân...</p>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
           source={patient.patientAvatar ? { uri: patient.patientAvatar } : require("../../src/assets/images/defaultAvatar.png")}
           style={styles.avatar}
        />
        <Text style={styles.name}>{patient.patientName}</Text>
        <Text style={styles.email}>{patient.patientEmail}</Text>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <Text style={styles.infoText}>Ngày sinh: {patient.patientBirthday}</Text>
        <Text style={styles.infoText}>Giới tính: {patient.patientGender}</Text>
        <Text style={styles.infoText}>Số điện thoại: {patient.patientPhone}</Text>
        <Text style={styles.infoText}>Địa chỉ: {patient.patientAddress}</Text>
        <Text style={styles.infoText}>BHXH: {patient.patientInsuranceNumber}</Text>
      </View>

      {/* Cài đặt tài khoản */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setEditModalVisible(true)}  
        >
          <Text style={styles.buttonText}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
      {editModalVisible && patient && (
        <EditProfileModal
          visible={editModalVisible}
          patient={patient}
          onClose={() => setEditModalVisible(false)}
          onSuccess={(updated) => setPatient(updated)} 
        />
      )}
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { alignItems: "center", padding: 20, backgroundColor: "#fff", marginBottom: 10 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "600" },
  email: { fontSize: 14, color: "gray" },
  section: { backgroundColor: "#fff", padding: 15, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  infoText: { fontSize: 14, marginBottom: 5 },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: { color: "#fff", fontWeight: "500" },
  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});
