import { View, Text, StyleSheet } from "react-native";

export default function Appointments() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📅 Đây là trang Lịch khám</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18, fontWeight: "500" },
});
