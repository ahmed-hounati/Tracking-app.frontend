import Colors from "@/constants/Colors";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.black }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#000",
          headerShadowVisible: false,
          tabBarStyle: {
            backgroundColor: Colors.primary,
            borderRadius: 15,
            margin: 15,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Octicons name="home" color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            headerShown: false,
            title: "Map",
            tabBarIcon: ({ color, focused }) => (
              <Entypo name={focused ? "map" : "map"} size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="middle"
          options={{
            tabBarLabel: "",
            headerShown: false,
            tabBarIcon: () => (
              <TouchableOpacity onPress={undefined}>
                <Image
                  source={require("../../assets/images/icon-play.png")}
                  style={styles.middleTabIcon}
                />
              </TouchableOpacity>
            ),
            tabBarStyle: {
              display: "none",
            },
          }}
        />
        <Tabs.Screen
          name="historiques"
          options={{
            headerShown: false,
            title: "History",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome5
                name={focused ? "history" : "history"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            headerShown: false,
            title: "Account",
            tabBarIcon: ({ color, focused }) => (
              <Octicons
                name={focused ? "person" : "person"}
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  middleTabIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 7,
  },
});
