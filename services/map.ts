import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import axios from "axios";

const API_URL = "http://192.168.11.115:3000/location";

export const sendUserLocation = async () => {
  try {
    // Get user ID from AsyncStorage
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("token not found in AsyncStorage");
      return;
    }

    // Request location permissions
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Location permission denied");
      return;
    }

    // Get current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Send location to backend
    const response = await axios.post(
      API_URL,
      { latitude, longitude },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    console.log("Location sent successfully", { latitude, longitude });
  } catch (error) {
    console.error("Error sending location", error);
  }
};
