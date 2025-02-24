import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import * as LocalAuthentication from "expo-local-authentication";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricsAvailable(isBiometricSupported && isBiometricEnrolled);
    };
    checkBiometrics();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      Alert.alert("Success", "Login successful!");
      navigation.replace("Intro");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Login Failed", error.message || "An error occurred.");
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent.");
    } catch (error) {
      console.error("Password reset error:", error);
      Alert.alert("Error", error.message || "An error occurred.");
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Biometrics",
      });

      if (result.success) {
        console.log("Biometric authentication successful.");
        navigation.replace("Intro");
      } else {
        Alert.alert("Error", "Biometric authentication failed.");
      }
    } catch (error) {
      console.error("Biometric login error:", error);
      Alert.alert("Error", "An error occurred during biometric authentication.");
    }
  };

  return (
    <LinearGradient
      colors={["#2C3E50", "#4CA1AF"]} // Define your gradient colors here
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LinearGradient colors={["#314755", "#26a0da"]} style={styles.button}>
        <TouchableOpacity onPress={handleLogin} style={styles.buttonInner}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity onPress={handleResetPassword}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      {biometricsAvailable && (
        <TouchableOpacity onPress={handleBiometricLogin}>
          <Text style={styles.link}>Login with Biometrics</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Register here.</Text>
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

export default LoginPage;
