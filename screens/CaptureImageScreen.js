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

const CaptureImageScreen = () => {
  const [isUploading, setIsUploading] = useState(false);

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
      uploadImage(result.uri);
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
      uploadImage(result.uri);
    }
  };

  // Simulate image upload
  const uploadImage = async (imageUri) => {
    setIsUploading(true);

    // Simulate a delay for uploading
    setTimeout(() => {
      setIsUploading(false);
      Alert.alert("Success", "Image uploaded successfully!");
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
