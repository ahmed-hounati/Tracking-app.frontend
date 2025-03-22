import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.11.106:3000/auth";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUp = async (userData: {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Signup Error:", error);
    throw error;
  }
};

export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/signin", credentials);
    const data = response.data;

    if (data.token) {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("id", data.id);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};
