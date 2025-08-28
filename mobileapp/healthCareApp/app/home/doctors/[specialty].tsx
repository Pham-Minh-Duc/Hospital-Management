import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BookingModal, { BookingData } from "../../../src/components/doctor/BookingModal";

const allDoctors = [
  {
    id: "1",
    name: "BS. Nguyễn Văn B",
    specialty: "cardio",
    hospital: "BV Bạch Mai",
    experience: 10,
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    id: "2",
    name: "BS. Trần Thị C",
    specialty: "pediatrics",
    hospital: "BV Nhi TW",
    experience: 8,
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  // ...
];

const specialtyNames: Record<string, string> = {
  cardio: "Tim mạch",
  pediatrics: "Nhi khoa",
  derma: "Da liễu",
  ortho: "Chấn thương chỉnh hình",
};

export default function DoctorList() {

  const { specialty } = useLocalSearchParams<{ specialty: string }>();
  // const [confirm, setConfirm] = React.useState("false");
  const [selectedDoctor, setSelectedDoctor] = React.useState<string | null>(null);
  const [showBooking, setShowBooking] = React.useState(false);

  const doctors = useMemo(
    () => allDoctors.filter((d) => d.specialty === specialty),
    [specialty]
  );


  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Danh sách bác sĩ - {specialtyNames[specialty || ""] || "Chuyên khoa"}
      </Text>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Image
                source={{ uri: item.avatar }}
                style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 8 }}
              />
              <Text style={styles.name}>{item.name}</Text>
              <Text>Bệnh viện: {item.hospital}</Text>
              <Text>Kinh nghiệm: {item.experience} năm</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedDoctor(item.name);
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
    flexDirection: "row", justifyContent: "space-between",
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
  }
});
