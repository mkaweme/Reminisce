import React, { useState, useEffect } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Sweet from "./components/sweet";
import Moments from "./components/moments";
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
  const [itemsTotal, setItemsTotal] = useState<number>(1600);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const getLocationPersmission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation.coords);
  };
    
  const fetchRoute = async () => {
      
    if (!location) return;
    const origin = `${-15.3339709},${28.3523437}`;
    const destination = `${location.latitude},${location.longitude}`;
    const apiKey = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
    console.log("API key is ", apiKey);
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.routes.length) {
      const meters = data.routes[0].legs[0].distance.value;
      setDistance(meters / 1000); // Convert to km
    }

    setDeliveryFee(calculateFee(distance));
  };
  
  // Delivery 0 - 5 Km , K30, 5 - 10KM: K50, 10 - 15KM: K80, 15 - 20Km: K 150> 20Km Out of town: dependent on town Ndo
  const calculateFee = (distance: number) => {
    if (distance <= 5) return 30;
    if (distance <= 10) return 50;
    if (distance <= 15) return 80;
    if (distance <= 20) return 150;
    return 200;
  };

  //Use a useEffect to rerender the component and show new delivy fee when the distance changes
  useEffect(() => {
    setDeliveryFee(calculateFee(distance));   
  }, [distance]);

  return (
    <ScrollView style={styles.container}>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <Text>Modal</Text>
      </Modal>
      <Text>Your Order</Text>
      <Divider />
      <Sweet />
      <Divider />
      <Moments />
      <Divider />
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
          <View style={styles.deliveryFeeContainer}>
            <Text style={styles.deliveryFeeText}>Courier Fee : </Text>
            <Text style={styles.deliveryFeeText}>K{deliveryFee}</Text>
          </View>
        </View>
      ) }
      <Divider />
      <View style={styles.totalContainer}>
        <View style={styles.totalItem}>
          <Text>Items </Text>
          <Text>K{itemsTotal}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text>Courier </Text>
          <Text>K{deliveryFee}</Text>
        </View>
        <View style={styles.totalItem}>
          <Text>Order Total </Text>
          <Text>K{itemsTotal + deliveryFee}</Text>
        </View>
      </View>
      <Divider />
      <TouchableOpacity style={styles.orderButton} onPress={() => setShowModal(true)}>
        <Text style={styles.addressButtonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginVertical: 30,
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
  deliveryFeeContainer: {
    flexDirection: "row",
    margin: 20,
  },
  deliveryFeeText : {
    fontSize: 24,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "column",
    margin: 20,
  },
  totalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  orderButton : {
    flexDirection: "row",
    backgroundColor: "#09759a",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 20,
  },
});