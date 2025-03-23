import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import axios from "axios";

const API_URL = process.env.API_URL;
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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

    await api.post(
      `${API_URL}/location`,
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

    const response = await axios.get(`${API_URL}/location/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      await axios.post(
        `${API_URL}/historiq`,
        {
          searchedUserId: id,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
