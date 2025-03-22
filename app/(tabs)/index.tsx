import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ImageBackground,
  Clipboard,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { getUserLocation, sendUserLocation } from "@/services/map";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();
  const locationInterval = useRef<NodeJS.Timeout | null>(null);

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
        Alert.alert("User Not Found", "Please enter a valid user ID");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch location.");
    }
  };

  useEffect(() => {
    const getId = async () => {
      const rep = await AsyncStorage.getItem("id");
      setId(rep);
    };

    const sendLocation = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("User is logged out, stopping location updates.");
        if (locationInterval.current) {
          clearInterval(locationInterval.current);
        }
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission denied");
        return;
      }

      await sendUserLocation();
    };
    getId();
    locationInterval.current = setInterval(sendLocation, 5000);

    return () => {
      if (locationInterval.current) {
        clearInterval(locationInterval.current);
      }
    };
  }, [id]);

  const copyToClipboard = async () => {
    if (id) {
      Clipboard.setString(id);
      Alert.alert("Copied!", "Your ID has been copied to the clipboard.");
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.grey} barStyle={"light-content"} />
      <ImageBackground
        source={require("../../assets/images/download.jpg")}
        style={styles.background}
        imageStyle={styles.imageBackground}
      >
        <View style={styles.idContainer}>
          <Text style={styles.welcome}>Your ID:</Text>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text style={styles.idText}>{id}</Text>
          </TouchableOpacity>
        </View>
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
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    resizeMode: "cover",
  },
  idContainer: {
    position: "absolute",
    top: 50,
    left: 50,
    zIndex: 1,
  },
  idText: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: "bold",
    textDecorationLine: "none",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#443627",
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
    backgroundColor: Colors.black,
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
