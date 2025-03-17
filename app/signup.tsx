import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUp } from "@/services/auth";

export default function Signup() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!firstName.trim()) return "First name is required";
    if (!lastName.trim()) return "Last name is required";

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthDate))
      return "Birth date must be in format YYYY-MM-DD";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    if (password.length < 6) return "Password must be at least 6 characters";

    return null;
  };

  const handleSignup = async () => {
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      Alert.alert("Validation Error", validationError);
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        birthDate,
      };

      const response = await signUp(userData);

      setIsLoading(false);

      if (response.error) {
        setError(response.error);
        Alert.alert("Signup Failed", response);
      } else {
        if (response.token) {
          await AsyncStorage.setItem("token", response.token);
          router.replace("/(tabs)");
        } else {
          Alert.alert(
            "Account Created",
            "Your account was created successfully. Please sign in.",
            [
              {
                text: "OK",
                onPress: () => router.push("/Signin"),
              },
            ]
          );
        }
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = "An error occurred during signup";
      setError(errorMessage);
      Alert.alert("Signup Failed", errorMessage);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/OldMap.jpg")}
      style={styles.background}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"dark-content"}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Signup</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          placeholder="First Name"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="BirthDate : yyyy-mm-dd"
          style={styles.input}
          placeholderTextColor="#ccc"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#ccc"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.disabledButton]}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Signup</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/Signin")}
        >
          <Text style={styles.loginButtonText}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  input: {
    width: "90%",
    backgroundColor: Colors.secondary || "#333", // Fallback if undefined
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    width: "90%",
    backgroundColor: Colors.black || "#000", // Fallback if undefined
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  loginButton: {
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary || "#fff", // Fallback if undefined
  },
  errorText: {
    color: "#ff6b6b",
    marginBottom: 10,
    textAlign: "center",
  },
});
