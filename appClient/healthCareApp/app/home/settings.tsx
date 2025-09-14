import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Switch,
  Button,
  StyleSheet,
  Modal,
} from "react-native";
import { ThemeContext } from "../../src/context/themeContext";
import { useRouter } from "expo-router";
import ChangePasswordModal from "../../src/modal/changePasswordModal"; // import modal đổi mật khẩu

export default function Settings() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showChangePass, setShowChangePass] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/auth/login");
  };

  const theme = {
    bg: darkMode ? "#121212" : "#f2f2f2",
    card: darkMode ? "#1e1e1e" : "#fff",
    text: darkMode ? "#fff" : "#000",
    border: darkMode ? "#333" : "#ddd",
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      <Text style={[styles.header, { color: theme.text }]}>
        ⚙️ Cài đặt ứng dụng
      </Text>

      {/* Thông tin tài khoản */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Thông tin tài khoản
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>Tên: Đức</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Email: duc@example.com
        </Text>
        <Button
          title="Đổi mật khẩu"
          onPress={() => setShowChangePass(true)}
        />
      </View>

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

      {/* Quyền riêng tư */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Quyền riêng tư
        </Text>
        <Button title="Xoá tài khoản" onPress={() => {}} color="red" />
      </View>

      {/* Hỗ trợ */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Hỗ trợ</Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Phiên bản app: 1.0.0
        </Text>
        <Text style={[styles.text, { color: theme.text }]}>
          Liên hệ: support@example.com
        </Text>
      </View>

      {/* Đăng xuất */}
      <View
        style={[styles.card, { backgroundColor: theme.card, marginBottom: 50 }]}
      >
        <Button title="Đăng xuất" onPress={handleLogout} color="red" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
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
