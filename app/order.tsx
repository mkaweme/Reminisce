import React, { useState, useEffect } from "react";
import { 
  Image, 
  Modal, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View } from "react-native";
import { Divider } from "@rneui/themed";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Sweet from "../components/splits/sweet";
import Moments from "../components/combos/moments";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { RootState } from "./store";

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

  const cartItems = useSelector((state : RootState) => state.cart.items);
  console.log("Cartitems are : ", cartItems);

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
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=
      ${origin}&destination=${destination}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.routes.length) {
      const meters = data.routes[0].legs[0].distance.value;
      setDistance(meters / 1000); // Convert to km
    }

    setDeliveryFee(calculateFee(distance));
  };
  
  // Delivery 0 - 5 Km ,
  // K30, 5 - 10KM: 
  // K50, 10 - 15KM: 
  // K80, 15 - 20Km: K 150> 20Km Out of town: dependent on town Ndo
  
  const calculateFee = (distance: number) => {
    if (distance <= 5) return 30;
    if (distance <= 10) return 50;
    if (distance <= 15) return 80;
    if (distance <= 20) return 150;
    return 200;
  };

  //Use a useEffect to rerender the component and show new delivy fee when the distance 
  //changes
  useEffect(() => {
    setDeliveryFee(calculateFee(distance));   
  }, [distance]);

  return (
    <ScrollView style={styles.container}>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <ScrollView>
          <Text style={styles.header}>Confrim Order</Text>
          <Divider />
          <View style={styles.sweetContainer}>
            <Text style={styles.splitCanvasType}>5 PIECE SWEET</Text>
            <View style={styles.splitContainer}>
              <View style={styles.previewContainer_1}> 
                <View style={styles.previewWindow_1}>
                  <Image source={{ uri: "https://picsum.photos/200/300" }} 
                    style={styles.image_1} />
                </View>
              </View>
              <View style={styles.previewContainer_2}>
                <View style={styles.previewWindow_2}>
                  <Image source={{ uri: "https://picsum.photos/200/300" }} 
                    style={styles.image_2} />
                </View>
              </View>
              <View style={styles.previewContainer_3}>
                <View style={styles.previewWindow_3}>
                  <Image source={{ uri: "https://picsum.photos/200/300" }} 
                    style={styles.image_3} />
                </View>
              </View>
              <View style={styles.previewContainer_2}>
                <View style={styles.previewWindow_2}>
                  <Image source={{ uri: "https://picsum.photos/200/300" }} 
                    style={styles.image_4} />
                </View>
              </View>
              <View style={styles.previewContainer_1}>
                <View style={styles.previewWindow_1}>
                  <Image source={{ uri: "https://picsum.photos/200/300" }} 
                    style={styles.image_5} />
                </View>
              </View>
            </View>
            <View style={styles.details}>
              <Text style={styles.splitCanvasDimensions}>90CM X 150CM : K850</Text>
            </View>
            <TouchableOpacity style={styles.removeButton}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
          <Divider />
          <View style={styles.momentsContainer}>
            <Text style={styles.splitCanvasType}>5 PIECE MOMENTS</Text>
            <View style={styles.imagesContainer}>
              <View style={styles.columnImagesContainer_1}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri : "https://picsum.photos/200/300" }} 
                    style={{ width: 120, height: 60 }} />
                </View>
                <View style={styles.imageContainer}>
                  <Image source={{ uri : "https://picsum.photos/200/300" }} 
                    style={{ width: 120, height: 60 }} />
                </View>
              </View>
              <View style={styles.imageContainer}>
                <Image source={{ uri : "https://picsum.photos/200/300" }} 
                  style={styles.image} />
              </View>
              <View style={styles.columnImagesContainer_2}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri : "https://picsum.photos/200/300" }} 
                    style={{ width: 120, height: 60 }} />
                </View>
                <View style={styles.imageContainer}>
                  <Image source={{ uri : "https://picsum.photos/200/300" }} 
                    style={{ width: 120, height: 60 }} />
                </View>
              </View>
            </View>
            <View style={styles.momentsDetails}>
              <Text style={styles.splitCanvasDimensions}>1: 59CM X 35CM</Text>
              <Text style={styles.splitCanvasDimensions}>4: 20CM X 40CM</Text>
              <Text style={styles.splitCanvasDimensions }>K750</Text>
            </View>
            <TouchableOpacity style={styles.removeButton}> 
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={styles.addressButtonText}>Confirm and Pay</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      <Text style={styles.header}>Your Order</Text>
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
  header: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 10,
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
    width: "90%",
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
  sweetContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf9eb",
    padding: 15,
  },
  splitCanvasType: {
    position: "relative",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
    margin: 15,
  },
  fullImageContainer: {
    height: 500,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  splitContainer: {
    flexDirection: "row",
    width: 310,
    height: 180,
    alignContent: "center",
    justifyContent: "space-between",
  },
  previewContainer_1: {
    position: "relative",
    top: 25,
    height: 140,
    shadowColor: "#000",
    shadowOffset: { 
      width: 5, 
      height: 5 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  previewContainer_2: {
    position: "relative",
    top: 10,
    height: 160,
    shadowColor: "#000",
    shadowOffset: { 
      width: 5, 
      height: 5 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  previewContainer_3: {
    position: "relative",
    height: 180,
    shadowColor: "#000",
    shadowOffset: { 
      width: 5, 
      height: 5 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  previewWindow_1: {
    width: 60,
    height: 130,
    overflow: "hidden",
  },
  previewWindow_2: {
    width: 60,
    height: 160,
    overflow: "hidden",
  },
  previewWindow_3: {
    width: 60,
    height: 180,
    overflow: "hidden",
  },
  image_1: {
    width: 300,
    height: 180,
    top: -25,
  },
  image_2: {
    width: 300,
    height: 180,
    position: "absolute",
    left: -60,
    top: -10,
  },
  image_3: {
    width: 300,
    height: 180,
    position: "absolute",
    left: -120,
  },
  image_4: {
    width: 300,
    height: 180,
    position: "absolute",
    left: -180,
    top: -10,  
  },
  image_5: {
    width: 300,
    height: 180,
    position: "absolute",
    left: -240,
    top: -25,  
  },
  details: {
    marginVertical: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
  },
  splitCanvasDimensions: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
  },
  removeButton : {
    backgroundColor: "#ffffff",
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  momentsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ff004d66",
  },
  comboType: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
    marginTop: 30,
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    columnGap: 10,
    height: 260,
    justifyContent: "center",
  },
  columnImagesContainer_1: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
    alignSelf: "flex-end",
  },
  columnImagesContainer_2: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
  },
  imageContainer : {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  image: {
    width: 120, 
    height: 180, 
    resizeMode: "stretch",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  momentsDetails: {
    marginVertical: 10,
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
});