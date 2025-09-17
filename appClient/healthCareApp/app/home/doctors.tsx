import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import {
  getAllSpecializations,
  getDoctorsBySpecialization,
} from "../../src/services/doctorService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Doctor = {
  doctorId: string;
  doctorName: string;
  doctorGender: string;
  doctorDob: string;
  doctorPhone: string;
  doctorEmail: string;
  doctorDepartment: string;
  doctorPosition: string;
  doctorQualification: string;
  doctorSpecialization: string;
  doctorStatus: string;
  doctorExperienceYears: string;
  doctorImage?: string;
};

type Specialty = {
  id: string;
  name: string;
};

export default function DoctorScreen() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(false);

  // load danh sách chuyên khoa
  useEffect(() => {
    const loadSpecialties = async () => {
      try {
        const res = await getAllSpecializations();
        const mapped = res.map((s: any) => ({
          id: String(s.specializationId),
          name: s.specializationName,
        }));
        setSpecialties(mapped);
      } catch (e) {
        console.error("Lỗi khi tải chuyên khoa:", e);
      } finally {
        setLoading(false);
      }
    };
    loadSpecialties();
  }, []);

  // fetch bác sĩ theo chuyên khoa
  const fetchDoctorsForSpecialty = async (id: string) => {
    setLoadingDoctors(true);
    try {
      const res = await getDoctorsBySpecialization(id);
      setDoctors(res);
    } catch (e) {
      console.error("Lỗi khi tải bác sĩ:", e);
      setDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const handleSelectSpecialty = (value: string) => {
    setSelectedSpecialty(value);
    if (value) {
      fetchDoctorsForSpecialty(value);
    } else {
      setDoctors([]);
    }
  };

  const handleBookAppointment = async (doctor: Doctor) => {
    const patientName = await AsyncStorage.getItem("patientName");
    console.log("bệnh nhân: ", patientName ,"Đặt lịch khám với:", doctor.doctorName);
    // 👉 ở đây có thể điều hướng sang màn hình đặt lịch
    // navigation.navigate("BookingScreen", { doctor });
  };

  const renderDoctorCard = ({ item }: { item: Doctor }) => (
    <View style={styles.card}>
      {/* Avatar + nút */}
      <View style={styles.leftBlock}>
        <Image
          source={{
            uri:
              item.doctorImage ||
              "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
          }}
          style={styles.avatar}
        />
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => handleBookAppointment(item)}
        >
          <Text style={styles.bookButtonText}>Đặt lịch khám</Text>
        </TouchableOpacity>
      </View>

      {/* Thông tin bên phải */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.doctorName}</Text>
        <Text style={styles.subInfo}>{item.doctorPosition}</Text>
        <Text style={styles.subInfo}>{item.doctorDepartment}</Text>
        <Text style={styles.detail}>Giới tính: {item.doctorGender}</Text>
        <Text style={styles.detail}>Ngày sinh: {item.doctorDob}</Text>
        <Text style={styles.detail}>Email: {item.doctorEmail}</Text>
        <Text style={styles.detail}>Điện thoại: {item.doctorPhone}</Text>
        <Text style={styles.detail}>Bằng cấp: {item.doctorQualification}</Text>
        <Text style={styles.detail}>
          Chuyên khoa: {item.doctorSpecialization}
        </Text>
        <Text style={styles.detail}>Trạng thái: {item.doctorStatus}</Text>
        <Text style={styles.detail}>
          Kinh nghiệm: {item.doctorExperienceYears} năm
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chọn chuyên khoa</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={specialties.map((s) => ({ label: s.name, value: s.id }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="-- Chọn chuyên khoa --"
          searchPlaceholder="Tìm chuyên khoa..."
          value={selectedSpecialty}
          onChange={(item) => handleSelectSpecialty(item.value)}
        />
      )}

      <View style={styles.doctorContainer}>
        {loadingDoctors ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : doctors.length > 0 ? (
          <FlatList
            data={doctors}
            keyExtractor={(item) => item.doctorId}
            renderItem={renderDoctorCard}
          />
        ) : selectedSpecialty ? (
          <Text style={{ fontStyle: "italic", color: "#666" }}>
            Không có bác sĩ nào cho chuyên khoa này
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },

  // dropdown
  dropdown: {
    height: 50,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "#333",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    borderRadius: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  doctorContainer: {
    flex: 1,
    marginTop: 16,
  },
  card: {
    flexDirection: "row", // ảnh trái - thông tin phải
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  leftBlock: {
    alignItems: "center",
    marginRight: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#eee",
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 4,
  },
  subInfo: {
    fontSize: 13,
    color: "#555",
    marginBottom: 2,
  },
  detail: {
    fontSize: 13,
    color: "#333",
    marginBottom: 2,
  },
});
