import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = process.env.API_URL;
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserHistory = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await api.get(`${API_URL}/historiq`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user history", error);
    return null;
  }
};
