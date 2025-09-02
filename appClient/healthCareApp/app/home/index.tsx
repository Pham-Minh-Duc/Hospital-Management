// import  from "react";
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../src/context/themeContext";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal, Pressable
} from "react-native";

export default function HomeScreen() {

    const router = useRouter();
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    const [patientId, setPatientId] = useState<string | null>(null);
    const [patientName, setPatientName] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      const loadUser = async () => {
        const id = await AsyncStorage.getItem("patientId");
        const name = await AsyncStorage.getItem("patientName");
        setPatientId(id);
        setPatientName(name);
        if (id && name) {
          setShowModal(true); // 🔥 Hiện modal ngay khi đăng nhập
          setTimeout(() => setShowModal(false), 3000); // 3 giây sau tự tắt
        } 
      };
      loadUser();
    }, []);

    const theme = {
      bg: darkMode ? "#121212" : "#f2f2f2",
      card: darkMode ? "#1e1e1e" : "#fff",
      text: darkMode ? "#fff" : "#000",
      border: darkMode ? "#333" : "#ddd",
    };
  
  return (
    <>
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <View style={[styles.headerTop, { backgroundColor: theme.card }]}>
          <Text style={[styles.title, { color: theme.text }]}>🏥 Bệnh viện Đức Tâm</Text>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push("/home/appointments")}
          >
            <Text style={styles.headerButtonText}>Đặt lịch</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          Chăm sóc sức khỏe toàn diện – Tận tâm từng phút
        </Text>
      </View>

      {/* Banner khuyến mãi */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>
          🎉 Ưu đãi 20% khi đặt lịch khám online trong tháng 9!
        </Text>
      </View>

      {/* Giới thiệu */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Giới thiệu</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          Bệnh viện Đức Tâm được thành lập năm 2005, là đơn vị y tế hàng đầu
          với đội ngũ bác sĩ chuyên môn cao, trang thiết bị hiện đại và dịch vụ
          chăm sóc tận tâm.
        </Text>
      </View>

      {/* Đội ngũ bác sĩ */}
      <View style={[styles.section, { backgroundColor: theme.card }]}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin:8 }}>
          <Text style={styles.sectionTitle}>👨‍⚕️ Đội ngũ bác sĩ</Text>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push("/home/doctors")}
          >
            <Text style={styles.headerButtonText}>Đặt lịch theo bác sĩ</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {doctors.map((doc) => (
            <View key={doc.id} style={[styles.doctorCard, { backgroundColor: theme.card }]}>
              <Image source={{ uri: doc.avatar }} style={styles.avatar} />
              <Text style={[styles.doctorName, { color: theme.text }]}>{doc.name}</Text>
              <Text style={[styles.doctorSpecialty, { color: theme.text }]}>{doc.specialty}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Dịch vụ nổi bật */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💼 Dịch vụ nổi bật</Text>
        <View style={[styles.serviceGrid, { backgroundColor: theme.card }]}>
          {services.map((service) => (
            <TouchableOpacity key={service.id} style={[styles.serviceCard, { backgroundColor: theme.bg }]}>
              <Text style={[styles.serviceIcon, { color: theme.text }]}>{service.icon}</Text>
              <Text style={[styles.serviceName, { color: theme.text }]}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tin tức & thông báo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🗞️ Tin tức & Thông báo</Text>
        {news.map((item) => (
          <View key={item.id} style={[styles.newsItem, { backgroundColor: theme.bg }]}>
            <Text style={[styles.newsTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={styles.newsDate}>{item.date}</Text>
          </View>
        ))}
      </View>

      {/* Lịch khám sắp tới */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏰ Lịch khám sắp tới</Text>
        {upcoming.map((item) => (
          <View key={item.id} style={styles.appointmentCard}>
            <Text>
              {item.date} - {item.time}
            </Text>
            <Text>
              {item.doctor} ({item.specialty})
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
              Xin chào, {patientName}!
            </Text>
            <Text style={{ marginBottom: 20 }}>ID: {patientId}</Text>
            <Pressable
              onPress={() => setShowModal(false)}
              style={{
                backgroundColor: "#2a52be",
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>Đóng</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
</>
  );
}

// 🧑‍⚕️ Dữ liệu bác sĩ
const doctors = [
  {
    id: "1",
    name: "BS. Nguyễn Văn A",
    specialty: "Nội tổng quát",
    avatar: "https://i.imgur.com/1X4Z1Zy.png",
  },
  {
    id: "2",
    name: "BS. Trần Thị B",
    specialty: "Nhi khoa",
    avatar: "https://i.imgur.com/2X4Z1Zy.png",
  },
];

// 🩺 Dịch vụ
const services = [
  { id: "1", name: "Khám tổng quát", icon: "🩺" },
  { id: "2", name: "Xét nghiệm", icon: "🧪" },
  { id: "3", name: "Tiêm chủng", icon: "💉" },
  { id: "4", name: "Nội soi", icon: "🔬" },
];

// 📰 Tin tức
const news = [
  { id: "1", title: "Lịch nghỉ lễ Quốc Khánh 2/9", date: "27/08/2025" },
  { id: "2", title: "Ưu đãi khám tổng quát tháng 9", date: "25/08/2025" },
];

// 📅 Lịch khám sắp tới
const upcoming = [
  {
    id: "1",
    date: "Thứ 6, 29/08/2025",
    time: "14:00",
    doctor: "BS. Phạm Văn E",
    specialty: "Tim mạch",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6ff",
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    marginTop: 10,
    marginBottom: 24,
    paddingTop: 5,
    borderRadius: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    padding: 5
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2a52be",
  },
  headerButton: {
    backgroundColor: "#2a52be",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    paddingBottom: 8,
  },
  promoBanner: {
    backgroundColor: "#ffeeba",
    padding: 14,
    borderRadius: 10,
    marginBottom: 24,
  },
  promoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8a6d3b",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2a52be",
    marginBottom: 8,
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  paragraph: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  doctorCard: {
    width: 120,
    marginRight: 12,
    alignItems: "center",
    padding: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 6,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 5,
  },
  doctorSpecialty: {
    fontSize: 12,
    color: "#666",
  },
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  serviceCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 3,
    marginRight: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  newsItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  newsDate: {
    fontSize: 12,
    color: "#666",
  },
  appointmentCard: {
    padding: 12,
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
    marginBottom: 10,
  },
});