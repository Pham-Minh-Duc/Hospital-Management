import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchDoctors } from "../../../src/services/doctorService";

type Doctor = {
  doctorDepartment: string;
  // bạn có thể thêm các trường khác nếu cần
};


// Khai báo kiểu cho chuyên khoa
type Specialty = {
  id: string;
  name: string;
};

export default function Specialties() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
  const loadSpecialties = async () => {
    try {
      const doctors: Doctor[] = await fetchDoctors();

      // Lấy danh sách chuyên khoa duy nhất, lọc và ép kiểu rõ ràng
      const rawDepartment: string[] = doctors
        .map((doc: Doctor) => doc.doctorDepartment)
        .filter((name: string): name is string => typeof name === "string" && name.trim() !== "");

      const uniqueDepartment: Specialty[] = Array.from(new Set<string>(rawDepartment)).map(
        (name: string) => ({
          id: name.toLowerCase().replace(/\s/g, "-"),
          name,
        })
      );

      setSpecialties(uniqueDepartment);
    } catch (error) {
      console.error("Lỗi khi tải chuyên khoa:", error);
    } finally {
      setLoading(false);
    }
  };

  loadSpecialties();
}, []);


  const renderItem = ({ item }: { item: Specialty }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/home/doctors/[specialty]",
          params: { specialty: item.id },
        })
      }
    >
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn chuyên khoa</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={specialties}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: "600" },
});