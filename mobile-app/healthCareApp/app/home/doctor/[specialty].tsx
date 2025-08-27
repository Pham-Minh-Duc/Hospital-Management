import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const allDoctors = [
  { id: "1", name: "BS. Nguyễn Văn B", specialty: "cardio", hospital: "BV Bạch Mai", experience: 10 },
  { id: "2", name: "BS. Trần Thị C", specialty: "pediatrics", hospital: "BV Nhi TW", experience: 8 },
  { id: "3", name: "BS. Lê Văn D", specialty: "derma", hospital: "BV Da liễu HN", experience: 5 },
  { id: "4", name: "BS. Phạm Văn E", specialty: "cardio", hospital: "BV 108", experience: 12 },
];

const specialtyNames: Record<string, string> = {
  cardio: "Tim mạch",
  pediatrics: "Nhi khoa",
  derma: "Da liễu",
  ortho: "Chấn thương chỉnh hình",
};

export default function DoctorList() {
  const { specialty } = useLocalSearchParams<{ specialty: string }>();

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
            <Text style={styles.name}>{item.name}</Text>
            <Text>Bệnh viện: {item.hospital}</Text>
            <Text>Kinh nghiệm: {item.experience} năm</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Chưa có bác sĩ trong chuyên khoa này</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  name: { fontSize: 16, fontWeight: "600" },
});
