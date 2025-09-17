import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, Modal, Switch } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Patient, getPatientById, deletePatient } from "../../src/services/clientService";
import EditProfileModal from "../../src/components/modal/profile/editProfileModal";
import ChangePasswordModal from "../../src/modal/setting/changePasswordModal"; // import modal đổi mật khẩu
import { ThemeContext } from "../../src/context/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../../src/store/authStore";
import { useRouter } from "expo-router";




export default function Profile() {

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [showChangePass, setShowChangePass] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const { setAuth } = useAuthStore();
    const router = useRouter();
    
    
    const theme = {
      bg: darkMode ? "#121212" : "#f2f2f2",
      card: darkMode ? "#1e1e1e" : "#fff",
      text: darkMode ? "#fff" : "#000",
      border: darkMode ? "#333" : "#ddd",
    };

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

  const handleLogout = async () => {
    // Xóa AsyncStorage
    await AsyncStorage.removeItem("patientId");
    await AsyncStorage.removeItem("patientName");

    // Reset Zustand
    setAuth(null, null);

    // Chuyển sang màn Login
    router.replace("/auth/login");
  };
  const handleDelete = async () => {
  if (confirm("Bạn có chắc chắn muốn xoá tài khoản? Hành động này không thể hoàn tác.")) {
    try {
      const id = await AsyncStorage.getItem("patientId");
      if (id) {
        await deletePatient(id); // truyền đúng kiểu string
        await handleLogout(); // Đăng xuất sau khi xoá tài khoản
      } else {
        console.warn("Không tìm thấy patientId trong AsyncStorage.");
      }
    } catch (e) {
      console.log(e);
    }
  }
};

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
      {/* Thông báo */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Thông báo
        </Text>
        <View style={styles.row}>
          <Text style={[styles.text, { color: theme.text }]}>Bật thông báo</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </View>
      </View>
      {/* Giao diện */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Giao diện
        </Text>
        <View style={styles.row}>
          <Text style={[styles.text, { color: theme.text }]}>Chế độ tối</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
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
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setShowChangePass(true)}  
        >
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
      {/* Quyền riêng tư */}
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Quyền riêng tư
              </Text>
              <Button title="Xoá tài khoản" onPress={handleDelete} color="red" />
            </View>
      
            {/* Hỗ trợ */}
            <View style={[styles.card, { backgroundColor: theme.card }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Hỗ trợ</Text>
              <Text style={[styles.text, { color: theme.text }]}>
                Phiên bản app: 1.0.0
              </Text>
              <Text style={[styles.text, { color: theme.text }]}>
                Liên hệ: minhduc5116@gmail.com
              </Text>
            </View>
      
            {/* Đăng xuất */}
            <View
              style={[styles.card, { backgroundColor: theme.card, marginBottom: 50 }]}
            >
              <Button title="Đăng xuất" onPress={handleLogout} color="red" />
            </View>

      {editModalVisible && patient && (
        <EditProfileModal
          visible={editModalVisible}
          patient={patient}
          onClose={() => setEditModalVisible(false)}
          onSuccess={(updated) => setPatient(updated)} 
        />
      )}
            {/* Modal đổi mật khẩu */}
      <Modal
        visible={showChangePass}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowChangePass(false)}
      >
        <ChangePasswordModal
          patientId={1} // hoặc lấy từ AsyncStorage / context
          onClose={() => setShowChangePass(false)}
        />
      </Modal>
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
    card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
    text: {
    fontSize: 14,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
