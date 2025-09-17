import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { fetchDoctors, getDoctorsBySpecialization } from "../../src/services/doctorService";

type Doctor = {
  doctorId: string;
  doctorName: string;
  specialization: {
    specializationId: string;
    specializationName: string;
  };
};

type Specialty = {
  id: string;
  name: string;
};

export default function DoctorScreen() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false);

  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const doctors: Doctor[] = await fetchDoctors();
        console.log("Fetched doctors:", doctors);

        const uniqueSpecialties: Specialty[] = doctors.reduce((acc: Specialty[], doc) => {
          const spec = doc.specialization;
          if (spec?.specializationId && spec.specializationName) {
            const exists = acc.some((s) => s.id === spec.specializationId);
            if (!exists) {
              acc.push({
                id: spec.specializationId,
                name: spec.specializationName,
              });
            }
          }
          return acc;
        }, []);

        setSpecialties(uniqueSpecialties);
        console.log("Specialties:", uniqueSpecialties);
      } catch (error) {
        console.error("Lỗi khi tải chuyên khoa:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSpecialties();
  }, []);

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      setDoctors([]);
    } else {
      setExpandedId(id);
      setLoadingDoctors(true);
      try {
        const res = await getDoctorsBySpecialization(id); // id là specializationId
        setDoctors(res);
      } catch (e) {
        console.error("Lỗi khi load bác sĩ:", e);
      } finally {
        setLoadingDoctors(false);
      }
    }
  };

  const renderItem = ({ item }: { item: Specialty }) => (
    <View style={styles.specialtyBlock}>
      <TouchableOpacity style={styles.card} onPress={() => toggleExpand(item.id)}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>

      {expandedId === item.id && (
        <View style={styles.doctorList}>
          {loadingDoctors ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : doctors.length > 0 ? (
            doctors.map((doc) => (
              <View key={doc.doctorId} style={styles.doctorItem}>
                <Text style={styles.doctorName}>{doc.doctorName}</Text>
                <Text style={styles.specializationText}>
                  {doc.specialization.specializationName}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ fontStyle: "italic", color: "#666" }}>Không có bác sĩ nào</Text>
          )}
        </View>
      )}
    </View>
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
  specialtyBlock: { marginBottom: 12 },
  card: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 10,
  },
  name: { fontSize: 16, fontWeight: "600" },
  doctorList: {
    marginTop: 8,
    marginLeft: 12,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    padding: 8,
  },
  doctorItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  doctorName: {
    fontSize: 15,
    fontWeight: "500",
  },
  specializationText: {
    fontSize: 13,
    color: "#555",
  },
});