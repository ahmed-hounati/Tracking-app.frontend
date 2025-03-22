import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import axios from "axios";

const API_URL = "http://192.168.11.106:3000/location";

export const sendUserLocation = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("token not found in AsyncStorage");
      return;
    }
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Location permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    await axios.post(
      API_URL,
      { latitude, longitude },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {}
};

export const getUserLocation = async (id: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("Token not found in AsyncStorage");
      return;
    }

    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {}
};
