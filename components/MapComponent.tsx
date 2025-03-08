// components/MapComponent.tsx
import React from "react";
import { Platform, StyleSheet, View, Text } from "react-native";

let MapView: any, Marker: any;

if (Platform.OS !== "web") {
  MapView = require("react-native-maps").default;
  Marker = require("react-native-maps").Marker;
}

const MapComponent = () => {
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Maps are not supported on the web. Please use a mobile device.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="My Location"
          description="This is a marker in San Francisco"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default MapComponent;
