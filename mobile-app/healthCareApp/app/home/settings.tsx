import React, { useContext, useState } from "react";
import { View, Text, ScrollView, Switch, Button } from "react-native";
import { ThemeContext } from "../../src/context/themeContext";
import { useRouter } from "expo-router";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/auth/login");
  }

  const themeStyles = {
    container: { flex: 1, padding: 20, backgroundColor: darkMode ? "#121212" : "#fff" },
    text: { color: darkMode ? "#fff" : "#000" },
    sectionTitle: { fontSize: 18, fontWeight: "500" as "500", marginBottom: 10, color: darkMode ? "#fff" : "#000" },
  };

  return (
    <ScrollView style={themeStyles.container}>
      <Text style={[themeStyles.text, { fontSize: 22, fontWeight: "600", marginBottom: 20, textAlign: "center" }]}>
        ⚙️ Cài đặt ứng dụng
      </Text>

      <View style={{ marginBottom: 25 }}>
        <Text style={themeStyles.sectionTitle}>Thông tin tài khoản</Text>
        <Text style={themeStyles.text}>Tên: Đức</Text>
        <Text style={themeStyles.text}>Email: duc@example.com</Text>
        <Button title="Đổi mật khẩu" onPress={() => {}} />
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={themeStyles.sectionTitle}>Thông báo</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={themeStyles.text}>Bật thông báo</Text>
          <Switch value={notificationsEnabled} onValueChange={() => setNotificationsEnabled(!notificationsEnabled)} />
        </View>
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={themeStyles.sectionTitle}>Giao diện</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={themeStyles.text}>Chế độ tối</Text>
          <Switch value={darkMode} onValueChange={toggleDarkMode} />
        </View>
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={themeStyles.sectionTitle}>Quyền riêng tư</Text>
        <Button title="Xoá tài khoản" onPress={() => {}} color="red" />
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={themeStyles.sectionTitle}>Hỗ trợ</Text>
        <Text style={themeStyles.text}>Phiên bản app: 1.0.0</Text>
        <Text style={themeStyles.text}>Liên hệ: support@example.com</Text>
      </View>

      <View style={{ marginBottom: 50 }}>
        <Button title="Đăng xuất" onPress={handleLogout} color="red" />
      </View>
    </ScrollView>
  );
}
