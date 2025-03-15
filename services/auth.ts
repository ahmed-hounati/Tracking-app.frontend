import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Define the base API URL
const API_URL = "http://192.168.11.115:3000/auth";

// ✅ Create an Axios instance with a baseURL
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Set timeout to avoid infinite waiting
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Fix signup function
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

// ✅ Fix signin function
export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/signin", credentials);
    const data = response.data;

    if (data.token) {
      await AsyncStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.error("Signin Error:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Signout Error:", error);
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};
