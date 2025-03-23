import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";

export default function MapScreen() {
  const { latitude, longitude } = useLocalSearchParams();
  const [location, setLocation] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lat = Array.isArray(latitude) ? latitude[0] : latitude;
    const lng = Array.isArray(longitude) ? longitude[0] : longitude;

    if (lat && lng) {
      setLocation({
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setLoading(false);
    } else {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location access is required to show your position on the map."
          );
          setLoading(false);
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });

        setLoading(false);
      })();
    }
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00ffcc" />
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={location!}
          showsUserLocation
          showsMyLocationButton
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="User Location"
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
