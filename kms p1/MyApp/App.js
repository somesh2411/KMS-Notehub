import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { auth } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

// 🔹 New IntroScreen (Image + Quote + Continue Button)
const IntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/LoginImages.jpeg")} style={styles.image} />
      <Text style={styles.quote}>
        "Knowledge increases by sharing but not by saving." {"\n"}– Dr. APJ Abdul Kalam
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

// 🔹 Login Screen
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const vitEmailRegex = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/;

  const handleAuth = async () => {
    if (!vitEmailRegex.test(email)) {
      Alert.alert("Invalid Email", "Use your VIT student email (e.g., somesh.s2022@vitstudent.ac.in)");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }
  
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Signup Successful", "You can now log in.");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("Intro");  // 🟢 Navigate to IntroScreen first
      }
    } catch (error) {
      Alert.alert("Authentication Error", error.message);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignup ? "Sign Up" : "Login"}</Text>
      <TextInput
        style={styles.input}
        placeholder="VIT Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isSignup ? "Sign Up" : "Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
        <Text style={styles.toggleText}>
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// 🔹 App Navigation (Now Starts from `IntroScreen.js`)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Home" component={NotehubScreen} />  {/* Fix HomeScreen Name */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}



// 🔹 Styles
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", padding: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5, width: "100%", alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16 },
  toggleText: { color: "#007BFF", marginTop: 10 },

  // 🔹 IntroScreen Styles
  image: { width: 200, height: 200, resizeMode: "contain", marginBottom: 20 },
  quote: { fontSize: 16, textAlign: "center", marginHorizontal: 20, color: "#333", fontWeight: "bold", marginBottom: 20 },
});

