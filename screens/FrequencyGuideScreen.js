import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit"; // Install react-native-chart-kit for the graph
import { Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

const FrequencyGuideScreen = () => {
  const [frequency, setFrequency] = useState(50); // Default slider value
  const [duration, setDuration] = useState("");

  const handleRun = () => {
    if (duration.trim() === "") {
      alert("Please enter the duration to run.");
    } else {
      alert(`Running frequency ${frequency} Hz for ${duration} seconds.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequency Recommendation</Text>

      {/* Frequency Range Slider */}
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Frequency Range: {frequency} Hz</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={frequency}
          onValueChange={(value) => setFrequency(value)}
          minimumTrackTintColor="#2e8b57"
          maximumTrackTintColor="#cccccc"
        />
      </View>

      {/* Graph Section */}
      <LineChart
        data={{
          labels: ["0", "25", "50", "75", "100"],
          datasets: [
            {
              data: [0, 20, 50, 20, 0], // Example graph data
            },
          ],
        }}
        width={Dimensions.get("window").width - 40} // Graph width
        height={200} // Graph height
        chartConfig={{
          backgroundColor: "#e9f7ef",
          backgroundGradientFrom: "#e9f7ef",
          backgroundGradientTo: "#e9f7ef",
          decimalPlaces: 0, // Round off numbers
          color: (opacity = 1) => `rgba(46, 139, 87, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 8,
          },
        }}
        bezier // Smooth curves
        style={styles.graph}
      />

      {/* Suggested Frequency */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Suggested Frequency:</Text>
        <TextInput
          style={styles.input}
          placeholder="Duration to run (in seconds)"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />
        <TouchableOpacity style={styles.runButton} onPress={handleRun}>
          <Text style={styles.runButtonText}>Run</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e9f7ef",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2e8b57",
    textAlign: "center",
    marginBottom: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 18,
    color: "#555555",
    textAlign: "center",
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  graph: {
    marginVertical: 20,
    borderRadius: 8,
  },
  inputContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    color: "#555555",
    marginBottom: 10,
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
  runButton: {
    backgroundColor: "#2e8b57",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  runButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FrequencyGuideScreen;
