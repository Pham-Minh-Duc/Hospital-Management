import { Stack } from "expo-router";

export default function DoctorsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ 
          title: "Chọn bác sĩ theo chuyên khoa",
          // headerShown: false
        }}
      />
      <Stack.Screen
        name="[specialty]"
        options={{ 
          title: "Danh sách bác sĩ", 
          headerBackTitle: "Quay lại", 
          // headerShown: false
        }}
      />
    </Stack>
  );
}