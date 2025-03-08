import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapComponent from "../../components/MapComponent";

const IndexScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Map</Text>
      <MapComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default IndexScreen;
