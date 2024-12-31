import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  TextInput 
} from "react-native";

const FarmerProfile = () => {
  const [editing, setEditing] = useState(false);
  const [language, setLanguage] = useState("en"); // Default to English
  const translations = {
    en: {
      pastHistory: "Past Pest History",
      nextFrequency: "Next Scheduled Frequency",
      edit: "Edit",
      save: "Save",
      pest: "Pest",
      solution: "Solution",
      schedule: "Scheduled Date",
      language: "Language",
    },
    hi: {
      pastHistory: "पिछला कीट इतिहास",
      nextFrequency: "अगला अनुसूचित फ्रीक्वेंसी",
      edit: "संपादित करें",
      save: "सहेजें",
      pest: "कीट",
      solution: "समाधान",
      schedule: "अनुसूचित तिथि",
      language: "भाषा",
    },
    mr: {
      pastHistory: "मागील कीटक इतिहास",
      nextFrequency: "पुढील नियोजित वारंवारता",
      edit: "संपादन करा",
      save: "जतन करा",
      pest: "कीटक",
      solution: "उपाय",
      schedule: "नियोजित तारीख",
      language: "भाषा",
    },
  };

  const t = translations[language]; // Use selected language for translations

  const [farmerData, setFarmerData] = useState({
    name: "Farmer Name",
    pastHistory: [
      { pest: "Aphids", solution: "Used Neem oil" },
      { pest: "Caterpillars", solution: "Sprayed Bacillus thuringiensis" },
    ],
    nextFrequency: "2024-01-15",
  });

  const [editableData, setEditableData] = useState(farmerData);

  const handleEditToggle = () => {
    if (editing) {
      setFarmerData(editableData); // Save changes
    }
    setEditing(!editing);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Farmer Name */}
      <Text style={styles.header}>{farmerData.name}</Text>

      {/* Past Pest History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.pastHistory}</Text>
        {farmerData.pastHistory.map((entry, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyText}>
              <Text style={styles.bold}>{t.pest}:</Text> {entry.pest}
            </Text>
            <Text style={styles.historyText}>
              <Text style={styles.bold}>{t.solution}:</Text> {entry.solution}
            </Text>
          </View>
        ))}
      </View>

      {/* Next Scheduled Frequency */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t.nextFrequency}</Text>
        {editing ? (
          <TextInput
            style={styles.input}
            value={editableData.nextFrequency}
            onChangeText={(text) =>
              setEditableData({ ...editableData, nextFrequency: text })
            }
          />
        ) : (
          <Text style={styles.text}>{farmerData.nextFrequency}</Text>
        )}
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
        <Text style={styles.editButtonText}>
          {editing ? t.save : t.edit}
        </Text>
      </TouchableOpacity>

      {/* Language Selection */}
      <View style={styles.languageSection}>
        <Text style={styles.sectionTitle}>{t.language}:</Text>
        <View style={styles.languageButtons}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => handleLanguageChange("en")}
          >
            <Text style={styles.languageButtonText}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => handleLanguageChange("hi")}
          >
            <Text style={styles.languageButtonText}>हिंदी</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => handleLanguageChange("mr")}
          >
            <Text style={styles.languageButtonText}>मराठी</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f7ef",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e8b57",
    marginBottom: 10,
  },
  historyItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#2e8b57",
  },
  historyText: {
    fontSize: 16,
    color: "#2e8b57",
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#2e8b57",
  },
  input: {
    borderWidth: 1,
    borderColor: "#2e8b57",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#2e8b57",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  languageSection: {
    marginTop: 20,
  },
  languageButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  languageButton: {
    backgroundColor: "#2e8b57",
    padding: 10,
    borderRadius: 8,
  },
  languageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FarmerProfile;
