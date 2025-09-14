import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { changePassword } from "../services/settingService";

interface Props {
  patientId: number;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<Props> = ({ patientId, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    try {
      const result = await changePassword(patientId, oldPassword, newPassword);
      setMessage(result);
      onClose();
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Đổi mật khẩu</Text>

        <TextInput
          placeholder="Mật khẩu cũ"
          secureTextEntry
          style={styles.input}
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <TextInput
          placeholder="Mật khẩu mới"
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonSave} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
            <Text style={styles.buttonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  message: {
    marginBottom: 10,
    color: "red",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonSave: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
  },
  buttonClose: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
