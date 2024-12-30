import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const HelpScreen = () => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") {
      Alert.alert("Please enter a message before sending.");
    } else {
      Alert.alert("Message sent successfully!", "We'll get back to you soon.");
      setMessage(""); // Clear the message input
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help / FAQ</Text>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.subTitle}>Questions</Text>
        <View style={styles.answerBox}>
          <Text style={styles.answerText}>
            Select a question to view the answer.
          </Text>
        </View>
      </View>

      {/* Reach Us Section */}
      <View style={styles.reachUsSection}>
        <Text style={styles.subTitle}>Reach Us Here</Text>
        <TextInput
          style={styles.messageInput}
          multiline
          placeholder="Type your message here..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#e9f7ef", // Greenish theme
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2e8b57",
    textAlign: "center",
    marginBottom: 20,
  },
  faqSection: {
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 10,
  },
  answerBox: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#2e8b57",
    borderRadius: 8,
    padding: 15,
  },
  answerText: {
    fontSize: 16,
    color: "#555555",
  },
  reachUsSection: {
    marginBottom: 20,
  },
  messageInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#2e8b57",
    borderRadius: 8,
    padding: 15,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 15,
  },
  sendButton: {
    backgroundColor: "#2e8b57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HelpScreen;
