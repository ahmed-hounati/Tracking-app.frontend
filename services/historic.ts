import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.11.106:3000/historiq";

export const getUserHistory = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return null;
    }

    const response = await axios.get(API_URL, {
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
