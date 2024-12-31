import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";

const AboutPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Our Photo and Mission */}
      <View style={styles.section}>
        <Image
          source={{ uri: "https://via.placeholder.com/300" }} // Replace with actual image
          style={styles.image}
        />
        <View style={styles.textSection}>
          <Text style={styles.title}>Our Mission</Text>
          <Text style={styles.text}>
            Our mission is to provide farmers with the best tools and knowledge to enhance productivity, promote sustainability, and improve their overall quality of life.
          </Text>
        </View>
      </View>

      {/* Testimonials Slider */}
      <View style={styles.section}>
        <Text style={styles.title}>What Our Users Say</Text>
        <Swiper style={styles.slider} showsPagination={true} autoplay={true}>
          <View style={styles.slide}>
            <Text style={styles.text}>“This platform has changed the way I manage my farm. I feel more confident in my decisions now.” - Farmer A</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>“The resources provided have been invaluable in improving my crop yields.” - Farmer B</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>“I’ve learned so much, and the community is supportive.” - Farmer C</Text>
          </View>
        </Swiper>
      </View>

      {/* Similar Initiatives */}
      <View style={styles.section}>
        <Text style={styles.title}>Similar Initiatives</Text>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("InitiativePage1")} // Replace with actual initiative page
        >
          <Text style={styles.linkText}>Initiative 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("InitiativePage2")} // Replace with actual initiative page
        >
          <Text style={styles.linkText}>Initiative 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("InitiativePage3")} // Replace with actual initiative page
        >
          <Text style={styles.linkText}>Initiative 3</Text>
        </TouchableOpacity>
      </View>

      {/* YouTube References */}
      <View style={styles.section}>
        <Text style={styles.title}>YouTube References</Text>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>YouTube Video 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>YouTube Video 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>YouTube Video 3</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2e8b57",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  textSection: {
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e8b57",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  slider: {
    height: 150,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    fontSize: 16,
    color: "#2e8b57",
    textDecorationLine: "underline",
  },
});

export default AboutPage;
