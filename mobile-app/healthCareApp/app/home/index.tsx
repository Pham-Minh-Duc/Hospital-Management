import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏥 HealthCare App</Text>
      <Text style={styles.subtitle}>Chào mừng bạn đến ứng dụng!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f6ff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2a52be",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: "#333",
  },
});
