import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const NotehubScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Top Bar Without "Home" and Back Arrow */}
      <View style={styles.topBar}>
        <Text style={styles.title}></Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialIcons name="account-circle" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Welcome Message */}
      <View style={styles.content}>
        <Text style={styles.heading}>Notehub</Text>
        <Text style={styles.welcomeText}>
          Hi Somesh, Welcome to Notehub! A platform where you can share or buy notes.
        </Text>
      </View>

      {/* Upload Button */}
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.buttonText}>Upload Notes/Book</Text>
      </TouchableOpacity>

      {/* User Details & Logout Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>User Details</Text>
            <Text>Username: Somesh</Text>
            <Text>Email: somesh@example.com</Text>
            
            {/* Logout Option Inside User Details */}
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  topBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3,
  },
  title: { flex: 1 },
  content: { padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  welcomeText: { fontSize: 16, color: "#333" },
  uploadButton: {
    margin: 20,
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  logoutButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  closeText: { color: "#fff", fontWeight: "bold" },
});

export default NotehubScreen;
