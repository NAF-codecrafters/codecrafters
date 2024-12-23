import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(true);

  // Additional fields for first-time login
  const [farmerName, setFarmerName] = useState("");
  const [email, setEmail] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [farmerNumber, setFarmerNumber] = useState("");

  const handleLogin = () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }

    if (isFirstTimeLogin) {
      // Validate all additional fields during sign-up
      if (
        farmerName === "" ||
        email === "" ||
        farmLocation === "" ||
        farmerNumber === ""
      ) {
        Alert.alert("Error", "Please fill in all the required fields.");
        return;
      }

      // Sign-up successful
      Alert.alert("Success", "Sign-up complete. You can now log in.");
      setIsFirstTimeLogin(false); // Switch to login mode
    } else {
      // Regular login
      Alert.alert("Success", "Login successful!");
      // Navigate to FarmerDashboard
      navigation.navigate("FarmerDashboard");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Page</Text>

      {/* Login Form */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Additional Fields for First-Time Login */}
      {isFirstTimeLogin && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Farmer Name"
            value={farmerName}
            onChangeText={setFarmerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Farm Location"
            value={farmLocation}
            onChangeText={setFarmLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Farmer Number"
            value={farmerNumber}
            onChangeText={setFarmerNumber}
            keyboardType="phone-pad"
          />
        </>
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {isFirstTimeLogin ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Link to Toggle Between Sign-Up and Login */}
      <TouchableOpacity
        onPress={() => {
          if (isFirstTimeLogin) {
            setIsFirstTimeLogin(false);
          } else {
            setIsFirstTimeLogin(true);
          }
        }}
      >
        <Text style={styles.footerText}>
          {isFirstTimeLogin
            ? "Already have an account? Login here"
            : "Don't have an account? Sign Up here"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9f7ef",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#2e8b57",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2e8b57",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    color: "#2e8b57",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
