import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FarmerDashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate("FarmerProfile")} // Navigate to Profile Page
      >
        <Image
          source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual profile image URL
          style={styles.profileIcon}
        />
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("AboutPage")} // Navigate to About Page
        >
          <Text style={styles.navText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Resources</Text>
        </TouchableOpacity>
      </View>

      {/* Welcome and Updates */}
      <View style={styles.topSection}>
        <Text style={styles.welcomeText}>Welcome, Farmer Name</Text>
        <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateText}>Update / News</Text>
        </TouchableOpacity>
      </View>

      {/* Dashboard Options */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("CaptureImageScreen")}
        >
          <Text style={styles.gridText}>Capture Pest Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Text style={styles.gridText}>Pest Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridItem}>
          <Text style={styles.gridText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("FrequencyGuide")} // Navigate to Frequency Guide
        >
          <Text style={styles.gridText}>Frequency Recommendation</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.gridItem}
          onPress={() => navigation.navigate("Help")} // Navigate to Help screen
        >
          <Text style={styles.gridText}>Help / FAQ</Text>
        </TouchableOpacity>
      </View>

      {/* Stats and Field Image */}
      <View style={styles.bottomSection}>
        <View style={styles.statsSection}>
          <Text style={styles.statsText}>Stats</Text>
          <View style={styles.statsBox} />
        </View>
        <View style={styles.fieldImageSection}>
          <Text style={styles.statsText}>Image of Field</Text>
          <View style={styles.fieldImageBox} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f7ef",
    padding: 10,
  },
  profileButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#2e8b57",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60, // Adjusted for profile icon space
    marginBottom: 20,
  },
  navButton: {
    padding: 10,
    backgroundColor: "#2e8b57",
    borderRadius: 5,
  },
  navText: {
    color: "#fff",
    fontWeight: "bold",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e8b57",
  },
  updateButton: {
    backgroundColor: "#2e8b57",
    padding: 10,
    borderRadius: 5,
  },
  updateText: {
    color: "#fff",
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "48%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2e8b57",
  },
  gridText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2e8b57",
  },
  bottomSection: {
    flex: 1,
    justifyContent: "space-between",
  },
  statsSection: {
    marginBottom: 20,
  },
  statsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 10,
  },
  statsBox: {
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2e8b57",
  },
  fieldImageSection: {
    flex: 1,
  },
  fieldImageBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2e8b57",
  },
});

export default FarmerDashboard;
