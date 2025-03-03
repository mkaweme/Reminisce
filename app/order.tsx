import React, { useState, useEffect } from "react";
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};
const Order: React.FC = () => {

  //Create state variables
  const [delivery, setDelivery] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  const url = Platform.OS === "android" ? "geo:0,0?q=Select+Location"
    : "http://maps.apple.com/?q=Select+Location";

  const getLocationPersmission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation.coords);
  };

  useEffect(() => {
    if (!location) return;
  
    const fetchRoute = async () => {
      const origin = `${location.latitude},${location.longitude}`;
      const destination = `${selectedLocation.latitude},${selectedLocation.longitude}`;
      const apiKey = "AIzaSyA5b4EXmyeF04v08pMkmidct3gs_I16jM0Y";
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.routes.length) {
        const meters = data.routes[0].legs[0].distance.value;
        setDistance(meters / 1000); // Convert to km
      }
    };
  
    fetchRoute();
  }, [selectedLocation]);
    
  return (
    <View style={styles.container}>
      <Text>Order</Text>
      <TouchableOpacity style={styles.deliveryButton} onPress={() => {
        getLocationPersmission();
        setDelivery(!delivery);
      }}>
        { delivery ? 
          <MaterialIcons name="radio-button-on" size={24} color="black" />
          :
          <MaterialIcons name="radio-button-off" size={24} color="black" />
        }
        <Text style={styles.deliveryButtonText}>Add Delivery</Text>
      </TouchableOpacity>
      { delivery && (
        <TouchableOpacity style={styles.mapContainer} onPress={() => Linking.openURL(url)}>
          <Text style={styles.addressButtonText}>Select Address</Text>
          <MapView style={styles.map} initialRegion={{
            latitude: location ? location.latitude : 0,
            longitude: location ? location.longitude : 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }} 
          onPress={(e) => setLocation({
            ...e.nativeEvent.coordinate,
            altitude: 0,
            accuracy: 0,
            altitudeAccuracy: 0,
            heading: 0,
            speed: 0
          })}
          >
            {location && (
              <Marker
                coordinate={location}
                draggable
                onDragEnd={(e) => setLocation({
                  ...e.nativeEvent.coordinate,
                  altitude: 0,
                  accuracy: 0,
                  altitudeAccuracy: 0,
                  heading: 0,
                  speed: 0
                })}
              />
            )}

          </MapView>
        </TouchableOpacity>
      ) }
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container : {
    flex: 1,
    flexDirection: "column",
  },
  deliveryButton : {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 10
  },
  deliveryButtonText : {
    marginLeft: 20,
    color: "#09759a",
    fontSize: 24,
    fontWeight: "bold",
  },
  mapContainer: {
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  addressButtonText : {
    marginLeft: 20,
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: 300,
    borderWidth: 1,
    borderColor: "#09759a",
    position: "absolute",
    top: 0,
  },
});