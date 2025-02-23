import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={require("./assets/LoginImages.jpeg")} style={styles.image} />

      {/* Quote */}
      <Text style={styles.quote}>
        "Knowledge increases by sharing but not by saving." {"\n"}– Dr. APJ Abdul Kalam
      </Text>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Home")}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  image: { width: 200, height: 200, resizeMode: "contain", marginBottom: 20 },
  quote: { fontSize: 16, textAlign: "center", marginHorizontal: 20, color: "#333", fontWeight: "bold" },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default IntroScreen;
