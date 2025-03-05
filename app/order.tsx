import React, { useState, useEffect } from "react";
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Constants from "expo-constants";

export type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};
const Order: React.FC = () => {

  //Create state variables
  const [delivery, setDelivery] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [distance, setDistance] = useState<number>(0);

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

  // useEffect(() => {
    
  const fetchRoute = async () => {
      
    if (!location) return;
    const origin = `${-15.3339709},${28.3523437}`;
    const destination = `${location.latitude},${location.longitude}`;
    const apiKey = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
    console.log("data :", data);
  
    if (data.routes.length) {
      const meters = data.routes[0].legs[0].distance.value;
      setDistance(meters / 1000); // Convert to km
    }

    console.log("Current location is ", location);
    console.log("Distance is ", distance);
  };
  
  // fetchRoute();
  // }, [location]);
    
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
        <View style={styles.mapContainer} >
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
          <TouchableOpacity style={styles.addressButton} onPress={() => fetchRoute()}>
            <Text style={styles.addressButtonText}>Set Address</Text>
          </TouchableOpacity>
        </View>
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
  },
  map: {
    width: "100%",
    height: 300,
    borderWidth: 3,
    borderColor: "#09759a",
  },
  addressButton : {
    flexDirection: "row",
    backgroundColor: "#09759a",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  addressButtonText : {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
});