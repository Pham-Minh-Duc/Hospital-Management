import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import BookingModal, { BookingData } from "../../../src/components/modal/doctor/BookingModal";
import { fetchDoctors } from "../../../src/services/doctorService";

type Doctor = {
  doctorId: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorDepartment: string;
  doctorGender: string;
  doctorDob: string;
  doctorPhone: string;
  doctorEmail: string;
  doctorPosition: string;
  doctorQualification: string;
  doctorExperienceYears: number;
  avatar?: string;
};

export default function DoctorList() {
  const { specialty } = useLocalSearchParams<{ specialty: string }>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const all = await fetchDoctors();

        // Chuẩn hóa giá trị chuyên khoa từ URL để khớp với dữ liệu trong DB
        const normalizedSpecialty = (specialty || "").toLowerCase().replace(/-/g, " ").trim();

        // Lọc bác sĩ theo chuyên khoa (dựa vào doctorDepartment)
        const filtered = all.filter(
          (doc: Doctor) =>
            typeof doc.doctorDepartment === "string" &&
            doc.doctorDepartment.toLowerCase().trim() === normalizedSpecialty
        );

        setDoctors(filtered);
      } catch (error) {
        console.error("Lỗi khi tải danh sách bác sĩ:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [specialty]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Danh sách bác sĩ - {specialty?.replace(/-/g, " ") || "Chuyên khoa"}
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.doctorId}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Image
                  source={{ uri: item.avatar || "https://i.pravatar.cc/150?u=" + item.doctorId }}
                  style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 8 }}
                />
                <Text style={styles.name}>{item.doctorName}</Text>
                <Text>Bệnh viện: {item.doctorDepartment}</Text>
                <Text>Kinh nghiệm: {item.doctorExperienceYears} năm</Text>
                <Text>Email: {item.doctorEmail}</Text>
                <Text>Giới tính: {item.doctorGender}</Text>
                <Text>SĐT: {item.doctorPhone}</Text>
                <Text>Vị trí: {item.doctorPosition}</Text>
                <Text>Học vị: {item.doctorQualification}</Text>
                <Text>Chuyên môn: {item.doctorSpecialization}</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedDoctor(item.doctorName);
                    setShowBooking(true);
                  }}
                >
                  <Text style={{ color: "#007AFF", fontSize: 14, fontWeight: "500" }}>
                    Đặt lịch
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text>Chưa có bác sĩ trong chuyên khoa này</Text>}
        />
      )}

      {selectedDoctor && (
        <BookingModal
          visible={showBooking}
          doctorName={selectedDoctor}
          onClose={() => setShowBooking(false)}
          onSubmit={(data: BookingData) => {
            Alert.alert("Đặt lịch thành công", `Bạn đã đặt lịch với ${selectedDoctor}`);
            console.log("Thông tin đặt lịch:", data);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  name: { fontSize: 16, fontWeight: "600" },
  button: {
    backgroundColor: "#fff",
    borderColor: "#007AFF",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 8,
  },
});