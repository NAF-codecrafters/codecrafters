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

  // Play audio for the detected pest
  const playPestSignal = async (pestName) => {
    const audioPath = pestAudioMap[pestName];

    if (audioPath) {
      try {
        const { sound } = await Audio.Sound.createAsync(audioPath);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.unloadAsync(); // Free up memory after playback
          }
        });
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    } else {
      console.error("Audio file not found for pest:", pestName);
    }
  };

  // Simulate pest detection
  const detectPest = (imageUri) => {
    // Simulate a delay for detection
    setTimeout(() => {
      const detectedPest = "Tuta"; // Example detected pest (replace with actual model output)
      Alert.alert("Pest Detected", `Detected pest: ${detectedPest}`);
      playPestSignal(detectedPest);
    }, 2000);
  };

  // Handle importing an image
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

  // Handle capturing an image with the camera
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

  // Simulate image upload and pest detection
  const uploadImage = async (imageUri) => {
    setIsUploading(true);

    // Simulate a delay for uploading
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
});

export default CaptureImageScreen;
