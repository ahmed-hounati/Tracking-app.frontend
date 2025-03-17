import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function getToken() {
      let token = await AsyncStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    }
    getToken();
    if (!isAuthenticated) {
      router.push("/Signin");
    }
  }, [isAuthenticated]);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Signin" options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
    </Stack>
  );
}
