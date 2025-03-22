import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { getUserLocation } from "@/services/map";

export default function Home() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!userId.trim()) {
      Alert.alert("Error", "Please enter a valid user ID.");
      return;
    }

    try {
      const location = await getUserLocation(userId);
      if (location) {
        router.push({
          pathname: "/map",
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        });
      } else {
        Alert.alert("Not Found", "User location not found.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
      console.error(error);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.grey} barStyle={"light-content"} />
      <View style={styles.container}>
        <Text style={styles.welcome}>🔍 Search User Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter User ID"
          placeholderTextColor="#ccc"
          value={userId}
          onChangeText={setUserId}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#fff" />
          <Text style={styles.buttonText}>Search</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
