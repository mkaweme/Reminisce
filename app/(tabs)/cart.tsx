import { 
  Image,
  Modal, 
  Pressable, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import React, { useEffect, useState } from "react";
import Cherry from "components/combos/cherry";
import Dine from "components/splits/dine";
import Fun from "components/combos/fun";
import Growth from "components/combos/growth";
import Hexagons from "app/(tabs)/(products)/hexagons";
import Home from "components/splits/home";
import Joy from "components/splits/joy";
import Moments from "components/combos/moments";
import Nice from "components/splits/nice";
import Sweet from "components/splits/sweet";
import Time from "components/combos/time";
import Warm from "components/combos/warm";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import EmptyCart from "assets/images/empty-cart.jpg";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "@rneui/base";
import Portrait from "components/portrait";
import * as Location from "expo-location";
import Constants from "expo-constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MapView, { Marker } from "react-native-maps";

export type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};

const Cart: React.FC = () => {

  //Define state variables
  // const [showModal, setShowModal] = useState<boolean>(false);
  const [cartEmpty, setCartEmpty] = useState<boolean>(true);
  const [delivery, setDelivery] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [itemsTotal, setItemsTotal] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  
  //Define a variable for holding the cart items
  const cart = useSelector((state: RootState) => state.cart);

  const getLocationPersmission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation(userLocation.coords);
  };
  
  //Define a function that fetches the delivery route and calculates the distance
  const fetchRoute = async () => {  
    if (!location) return;
    const origin = `${-15.3339709},${28.3523437}`;
    const destination = `${location.latitude},${location.longitude}`;
    const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;
    console.log("API key is ", apiKey);
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=
    ${origin}&destination=${destination}&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.routes.length) {
      const meters = data.routes[0].legs[0].distance.value;
      setDistance(meters / 1000); // Convert to km
      console.log("Distance is", meters / 1000);
    }

    setDeliveryFee(calculateFee(distance));
  };

  //Define a function that calculates the delivery fee
  const calculateFee = (distance: number) => {
    if(!delivery) return 0;
    if (distance <= 5) return 30;
    if (distance <= 10) return 50;
    if (distance <= 15) return 80;
    if (distance <= 20) return 150;
    return 200;
  };

  const componentsMap = {
    CHERRY: Cherry,
    DINE: Dine,
    FUN: Fun,
    GROWTH: Growth,
    HEXAGONS: Hexagons,
    HOME: Home,
    JOY: Joy,
    MOMENTS: Moments,
    NICE: Nice,
    A1: Portrait,
    A2: Portrait,
    A3: Portrait,
    A4: Portrait,
    "40 X 40": Portrait,
    "50 X 50": Portrait,
    "30 X 30": Portrait,
    "A4 X 2": Portrait,
    SWEET: Sweet,
    TIME: Time,
    WARM: Warm,
  };

  //Calculate items total
  const calculateItemsTotal = () => {
    const total = cart.items
      .map((item) => (item.price * item.quantity))
      .reduce((acc, item) => {
        return acc + item;
      });
    setItemsTotal(total);
    const orderTotal = delivery ? total + deliveryFee : total;
    setOrderTotal(orderTotal);
  };
  
  //Use a useEffect to rerender and new cart items and new order items total
  //when items in the cart change
  useEffect(() => {
    if (cart.items.length === 0) {
      setCartEmpty(true);
    } else {
      setCartEmpty(false); 
      calculateItemsTotal();
    }
  }, [cart.items.length, delivery]);

  //Use a useEffect to rerender the component and show new delivery fee when 
  //the distance changes
  useEffect(() => {
    setDeliveryFee(calculateFee(distance));   
  }, [distance]);
    
  return (
    <LinearGradient 
      colors={["#34ffc688", "#62004d"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }}  
      style={styles.gradientContainer}
    >
      {cartEmpty && (
        <View style={styles.cartEmptyContainer}>
          <Image source={EmptyCart} width={512} height={512} style={styles.cartEmptyImage}/>
          <Text style={styles.cartEmptyText}>Your cart is empty</Text>
        </View>
      )}
      <Modal 
        visible={showModal} 
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.canvasType}>Confrim Order</Text>
            <Pressable style={styles.modalCloseButton} onPress={() => setShowModal(!showModal)}>
              <AntDesign name="closecircleo" size={24} color="white" />
            </Pressable>
          </View>
          <ScrollView>
            <Divider />
            {cart.items.map((item, index) => {
              const Component = typeof item.name === "string" && item.name in componentsMap 
                ? componentsMap[item.name as keyof typeof componentsMap] 
                : null;
              return Component ? 
                <View key={index}>
                  <Component item={item}/> 
                  <Divider width={1}/>
                </View>
                : null;
            })}
            <TouchableOpacity style={styles.orderButton} onPress={() => setShowModal(true)}>
              <Text style={styles.addressButtonText}>Pay</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <View style={styles.container}>
        <Text style={{ ...styles.canvasType, marginTop: 0 }}>Your order</Text>
        <ScrollView>
          <Divider width={2}/>
          {cart.items.map((item, index) => {
            const Component = typeof item.name === "string" && item.name in componentsMap 
              ? componentsMap[item.name as keyof typeof componentsMap] 
              : null;
            return Component ? 
              <View key={index}>
                <Component item={item}/> 
                <Divider width={1}/>
              </View>
              : null;
          })}
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
          <View style={styles.totalContainer}>
            <View style={styles.totalItem}>
              <Text style={styles.totalText}>Items </Text>
              <Text style={styles.totalText}>K{itemsTotal}</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.totalText}>Courier </Text>
              <Text style={styles.totalText}>K{deliveryFee}</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.totalText}>Order Total </Text>
              <Text style={styles.totalText}>K{orderTotal}</Text>
            </View>
            <Divider width={2} style={{ marginTop: 20 }}/>
          </View>
        </ScrollView>
        <LinearGradient 
          colors={["#34ffc688", "#d900aa"]} 
          start={{ x:0, y: 0 }} 
          end={{ x: 1, y: 1 }}  
          style={styles.orderButton}
        >
          <TouchableOpacity  onPress={() => setShowModal(true)}>
            <Text style={{ ...styles.deliveryFeeText, color: "#ffffff" }}>
              Confirm Order
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

export default Cart;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  canvasType: {
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    marginTop: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  cartEmptyContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cartEmptyImage: {
    height: 400,
    width: 400,
    resizeMode: "contain",
  },
  cartEmptyText: {
    fontSize: 30,
    marginTop: 20,
    color: "#00000088",
  },
  modal: {
    backgroundColor: "#454545",
  },
  modalHeader:{
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
  },
  modalCloseButton: {
    position: "absolute",
    right: 8,
    top: 8,
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
    fontSize: 24,
    fontWeight: "bold",
  },
  mapContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  map: {
    width: "100%",
    height: 300,
  },
  addressButton : {
    flexDirection: "row",
    backgroundColor: "#454545",
    width: 160,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
  addressButtonText : {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
  },
  deliveryFeeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  deliveryFeeText : {
    fontSize: 24,
    fontFamily: "Montserrat-Medium",
  },
  totalContainer: {
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 80,
  },
  totalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
  },
  totalText: {
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    color: "#ffffff",
  },
  orderButton : {
    flexDirection: "row",
    backgroundColor: "#09759a",
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: 15,
    borderRadius: 90,
    position: "absolute",
    bottom: 20,
  },
});