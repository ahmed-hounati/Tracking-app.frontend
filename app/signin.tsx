import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import Colors from "@/constants/Colors";

export default function Signin() {
  const router = useRouter();

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
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#ccc"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#ccc"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Signup Pressed")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/Signup")}
        >
          <Text style={styles.loginButtonText}>Have an account?Signup</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
    backgroundColor: Colors.secondary,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: "#000",
  },
  button: {
    width: "90%",
    backgroundColor: Colors.black,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButton: {
    display: "flex",
    justifyContent: "flex-end",
    color: Colors.black,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
