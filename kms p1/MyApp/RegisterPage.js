import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential.user);
      Alert.alert("Registration Successful", "You can now log in.");
      navigation.navigate("Login");
    } catch (err) {
      setError(err.message);
      Alert.alert("Registration Failed", err.message);
    }
  };

  return (
    <LinearGradient
      colors={["#2C3E50", "#4CA1AF"]} // Define your gradient colors here
      style={styles.container}
    >
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <LinearGradient colors={["#314755", "#26a0da"]} style={styles.button}>
        <TouchableOpacity onPress={handleRegister} style={styles.buttonInner}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </LinearGradient>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login here.</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fdf2f0", // Adjust text color for better visibility
    textShadowColor: "#000", // Shadow color
    textShadowOffset: { width: 2, height: 2 }, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff", // Add background for inputs
  },
  button: {
    borderRadius: 10,
    margin: 10,
    paddingVertical: 15, // Increased vertical padding for a larger button
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  error: {
    marginTop: 10,
    textAlign: "center",
    color: "#FF4D4D",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "bold",
    color: "#fdf2f0", // Main text color
    textShadowColor: "#000", // Light yellow for shadow
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 5, // Blur radius for shadow
  },
});

export default Register;
