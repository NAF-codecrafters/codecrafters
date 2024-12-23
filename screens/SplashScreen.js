import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Image Component */}
      <Image
        source={require("../assets/logo.png")} // Replace 'logo.png' with the actual filename
        style={styles.logo}
      />

      <Button
        title="Get Started"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Optional: Add a background color
  },
  logo: {
    width: 150, // Adjust the width of the image
    height: 150, // Adjust the height of the image
    marginBottom: 20, // Space between the image and text
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SplashScreen;
