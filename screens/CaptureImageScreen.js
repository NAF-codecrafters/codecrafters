import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Audio } from "expo-av";
import pestAudioMap from "../backend/utils/audioUtils";

const CaptureImageScreen = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [frequency, setFrequency] = useState(1); // Default frequency multiplier

  const playPestSignal = async (pestName) => {
    const audioPath = pestAudioMap[pestName];

    if (audioPath) {
      try {
        const { sound: newSound } = await Audio.Sound.createAsync(audioPath);
        setSound(newSound);
        newSound.setRateAsync(frequency, false); // Set frequency rate
        await newSound.playAsync();
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            newSound.unloadAsync(); // Free up memory after playback
            setSound(null);
            setIsPlaying(false);
          }
        });
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    } else {
      console.error("Audio file not found for pest:", pestName);
    }
  };

  const pauseAudio = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeAudio = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const increaseFrequency = async () => {
    if (sound) {
      const newFrequency = Math.min(frequency + 0.1, 2); // Limit frequency to 2x
      setFrequency(newFrequency);
      await sound.setRateAsync(newFrequency, false);
    }
  };

  const lowerFrequency = async () => {
    if (sound) {
      const newFrequency = Math.max(frequency - 0.1, 0.5); // Limit frequency to 0.5x
      setFrequency(newFrequency);
      await sound.setRateAsync(newFrequency, false);
    }
  };

  const requestPlaySignal = (pestName) => {
    Alert.alert(
      "Permission Required",
      `To interrupt the detected pest, we need to play a specific frequency at a particular strength. Do you want to proceed?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Play Signal",
          onPress: () => {
            console.log("Permission granted. Playing signal...");
            playPestSignal(pestName);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const detectPest = (imageUri) => {
    setTimeout(() => {
      const detectedPest = "Tuta"; // Example detected pest (replace with actual model output)
      Alert.alert("Pest Detected", `Detected pest: ${detectedPest}`, [
        {
          text: "OK",
          onPress: () => requestPlaySignal(detectedPest),
        },
      ]);
    }, 2000);
  };

  const handleImportImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Camera roll access is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const handleOpenCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Denied", "Camera access is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (imageUri) => {
    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      Alert.alert("Success", "Image uploaded successfully!");
      detectPest(imageUri); // Simulate pest detection after upload
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Pest Image</Text>

      <TouchableOpacity style={styles.button} onPress={handleImportImage}>
        <Text style={styles.buttonText}>IMPORT IMAGE</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
        <Text style={styles.buttonText}>OPEN CAMERA</Text>
      </TouchableOpacity>

      {isUploading && (
        <View style={styles.uploadContainer}>
          <ActivityIndicator size="large" color="#2e8b57" />
          <Text style={styles.uploadText}>Upload in progress</Text>
        </View>
      )}

      {sound && (
        <View style={styles.remoteContainer}>
          <Text style={styles.remoteTitle}>Remote Control</Text>
          <TouchableOpacity
            style={styles.remoteButton}
            onPress={isPlaying ? pauseAudio : resumeAudio}
          >
            <Text style={styles.remoteButtonText}>
              {isPlaying ? "Pause" : "Resume"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remoteButton}
            onPress={increaseFrequency}
          >
            <Text style={styles.remoteButtonText}>Increase Frequency</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remoteButton}
            onPress={lowerFrequency}
          >
            <Text style={styles.remoteButtonText}>Lower Frequency</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 30,
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "#2e8b57",
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 18,
    color: "#6c757d",
    marginVertical: 10,
  },
  uploadContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6c757d",
  },
  remoteContainer: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "#2e8b57",
    padding: 20,
    borderRadius: 15,
    width: "90%",
  },
  remoteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  remoteButton: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  remoteButtonText: {
    color: "#2e8b57",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CaptureImageScreen;
