import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <StatusBar backgroundColor={Colors.grey} barStyle={"light-content"} />
      <View style={styles.container}>
        <Text style={styles.welcome}>👋 Hello, User!</Text>
        <Text style={styles.subtitle}>Welcome to your tracking dashboard</Text>

        {/* Map Section */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/map")}
        >
          <Ionicons name="map" size={40} color="#00FFC2" />
          <Text style={styles.cardText}>Live Map</Text>
        </TouchableOpacity>

        {/* History Section */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/historiques")}
        >
          <Ionicons name="time" size={40} color="#FF007A" />
          <Text style={styles.cardText}>Tracking History</Text>
        </TouchableOpacity>

        {/* Account Section */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/account")}
        >
          <Ionicons name="person" size={40} color="#FFD700" />
          <Text style={styles.cardText}>Account</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.grey,
    width: "100%",
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 30,
  },
  card: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    backdropFilter: "blur(10px)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
  },
});
