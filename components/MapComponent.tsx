import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const DEFAULT_LOCATION = {
  latitude: 39.9334,
  longitude: 32.8597,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapComponent: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied. Showing default location.");
        setLocation(DEFAULT_LOCATION);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location ? {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          } : DEFAULT_LOCATION}
        >
          <Marker
            coordinate={{
              latitude: location ? location.latitude : DEFAULT_LOCATION.latitude,
              longitude: location ? location.longitude : DEFAULT_LOCATION.longitude,
            }}
            title={"Your Location"}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;