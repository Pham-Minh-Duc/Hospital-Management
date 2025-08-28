import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable, Modal, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Profile() {

    const router = useRouter();

    const handleLogout = () => {
        router.replace("/auth/login");
    }


    const [modalVisible, setModalVisible] = useState(false);
    const [listModalVisible, setListModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);



  // Dữ liệu lịch khám hiện tại
  const currentAppointment = {
    date: "2025-08-30",
    time: "09:00",
    doctor: "BS. Trần Văn B",
    department: "Nội khoa",
    note: "Nhớ mang theo xét nghiệm cũ",
  };

  // Dữ liệu tất cả lịch khám
const allAppointments = [
  { date: "2025-08-30", time: "09:00", doctor: "BS. Trần Văn B", department: "Nội khoa", note: "Nhớ mang theo xét nghiệm cũ" },
  { date: "2025-07-15", time: "10:30", doctor: "BS. Lê Thị C", department: "Ngoại khoa", note: "Đem hồ sơ cũ" },
  { date: "2025-06-20", time: "14:00", doctor: "BS. Phạm Văn D", department: "Tai mũi họng", note: "" },
];

const [userInfo, setUserInfo] = useState({
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  birthday: "01/01/1990",
  gender: "Nam",
  phone: "0123456789",
  bloodType: "O+",
});

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nguyễn Văn A</Text>
        <Text style={styles.email}>nguyenvana@email.com</Text>
      </View>

      {/* Thông tin cá nhân */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <Text style={styles.infoText}>Ngày sinh: 01/01/1990</Text>
        <Text style={styles.infoText}>Giới tính: Nam</Text>
        <Text style={styles.infoText}>Số điện thoại: 0123456789</Text>
        <Text style={styles.infoText}>Nhóm máu: O+</Text>
      </View>

      {/* Lịch khám */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lịch khám</Text>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Xem lịch khám</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setListModalVisible(true)}
        >
          <Text style={styles.buttonText}>Danh sách lịch khám</Text>
        </TouchableOpacity>
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

      {/* Modal hiển thị lịch khám */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📅 Lịch khám hiện tại</Text>
            <Text>Ngày: {currentAppointment.date}</Text>
            <Text>Giờ: {currentAppointment.time}</Text>
            <Text>Bác sĩ: {currentAppointment.doctor}</Text>
            <Text>Khoa: {currentAppointment.department}</Text>
            <Text>Ghi chú: {currentAppointment.note}</Text>

            <Pressable
              style={[styles.button, { marginTop: 15 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="none"
        transparent={true}
        visible={listModalVisible}
        onRequestClose={() => setListModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: "70%" }]}>
            <Text style={styles.modalTitle}>📋 Tất cả lịch khám</Text>
            <ScrollView>
              {allAppointments.map((item, index) => (
                <View key={index} style={{ marginBottom: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                  <Text>Ngày: {item.date}</Text>
                  <Text>Giờ: {item.time}</Text>
                  <Text>Bác sĩ: {item.doctor}</Text>
                  <Text>Khoa: {item.department}</Text>
                  <Text>Ghi chú: {item.note || "Không có ghi chú"}</Text>
                </View>
              ))}
            </ScrollView>

            <Pressable
              style={[styles.button, { marginTop: 15 }]}
              onPress={() => setListModalVisible(false)}
            >
              <Text style={styles.buttonText}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

<Modal
  animationType="slide"
  transparent={true}
  visible={editModalVisible}
  onRequestClose={() => setEditModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={[styles.modalContent, { width: "90%" }]}>
      <Text style={styles.modalTitle}>✏️ Chỉnh sửa thông tin</Text>

      {/* Tên */}
      <Text>Tên:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.name}
        onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
      />

      {/* Email */}
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.email}
        onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
        keyboardType="email-address"
      />

      {/* Ngày sinh */}
      <Text>Ngày sinh:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.birthday}
        onChangeText={(text) => setUserInfo({ ...userInfo, birthday: text })}
      />

      {/* Giới tính */}
      <Text>Giới tính:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.gender}
        onChangeText={(text) => setUserInfo({ ...userInfo, gender: text })}
      />

      {/* Số điện thoại */}
      <Text>Số điện thoại:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.phone}
        onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
        keyboardType="phone-pad"
      />

      {/* Nhóm máu */}
      <Text>Nhóm máu:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.bloodType}
        onChangeText={(text) => setUserInfo({ ...userInfo, bloodType: text })}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
        <Pressable
          style={[styles.button, { flex: 1, marginRight: 5 }]}
          onPress={() => setEditModalVisible(false)}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { flex: 1, marginLeft: 5 }]}
          onPress={() => {
            setEditModalVisible(false);
            // Có thể lưu userInfo vào backend tại đây
          }}
        >
          <Text style={styles.buttonText}>Lưu</Text>
        </Pressable>
      </View>
    </View>
  </View>
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
});
