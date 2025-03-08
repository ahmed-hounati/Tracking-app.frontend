import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="Signin" options={{ headerShown: false }} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} />
    </Stack>
  );
}
