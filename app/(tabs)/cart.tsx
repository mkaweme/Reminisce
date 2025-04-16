import { 
  Image,
  Modal, 
  Platform, 
  Pressable, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
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
import { useDispatch, useSelector } from "react-redux";
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
import CheckMark from "components/checkMark";
import { cartActions } from "app/CartReducer";
import { router } from "expo-router";
import { PrismaClient } from "../../generated/prisma";

export type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};

const Cart: React.FC = () => {

  //Define state variables
  const [delivery, setDelivery] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [itemsTotal, setItemsTotal] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  // const [address, setAddress] = useState<string>("");
  
  //Define a variable for holding the dispatch function and cart items
  const dispatch = useDispatch();
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
    try {
      const origin = `${-15.3339709},${28.3523437}`;
      const destination = `${location.latitude},${location.longitude}`;
      const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=
      ${origin}&destination=${destination}&key=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.routes.length) {
        const meters = data.routes[0].legs[0].distance.value;
        const courierFee = calculateFee(meters / 1000);
        setDistance(meters / 1000);
        setDeliveryFee(courierFee);
        console.log("Distance in kilometers:", meters / 1000);
        console.log("Courier fee:", courierFee);
        console.log("Delivery fee:", deliveryFee);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
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
    if(cart.items.length === 0) return;
    const total = cart.items
      .map((item) => (item.price * item.quantity))
      .reduce((acc, item) => {
        return acc + item;
      });
    setItemsTotal(total);
    if(!delivery) {
      setDeliveryFee(0);     
    } 
    const orderTotal = total + deliveryFee;
    setOrderTotal(orderTotal);
  };
  
  const prisma = new PrismaClient();

  // async function testConnection() {
  //   const orders = await prisma.order.findMany();
  //   console.log(orders);
  // }
  
  // testConnection();

  //Define a function that places the order
  const placeOrder = async() => {
    
    await prisma.order.create({

      data: {
        id: cart.items.map((item) => item.id).join(""),
        first_Name: firstName,
        last_Name: lastName,
        phoneNumber: phoneNumber,
        latitude: location?.latitude,
        longitude: location?.longitude,
        photos: cart.items.map((item) => item.imageUrls),
        items: cart.items,
        delivery: delivery,
        deliveryFee: deliveryFee,
        distance: distance,
        total: orderTotal,
      },
    });

    //When succesful, clear cart
    dispatch(cartActions.clearCart());
   
    //display checkmark
    setShowModal(false);
    setOrderPlaced(true);
    navigatetoHome();
  };
  
  //Use a useEffect to rerender and new cart items and new order items total
  //when items in the cart change
  useEffect(() => {  
    calculateItemsTotal();
  }, [cart.items.length, delivery, deliveryFee]);

  //Use a useEffect to rerender the component and show new delivery fee when 
  //the distance changes
  useEffect(() => {
    setDeliveryFee(calculateFee(distance));   
  }, [distance]);
  
  //navigate to hom
  const navigatetoHome = () => {
    setTimeout(() => {
      setOrderPlaced(false);
      setDelivery(false);
      setLocation(null);
      router.replace("/");
      router.dismissAll();
    }, 5000);
  };

  return (
    <LinearGradient 
      colors={["#34ffc688", "#62004d"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }}  
      style={styles.gradientContainer}
    >
      {cart.items.length === 0 && !orderPlaced && (
        <View style={styles.cartEmptyContainer}>
          <Image source={EmptyCart} width={512} height={512} style={styles.cartEmptyImage}/>
          <Text style={styles.cartEmptyText}>Your cart is empty</Text>
        </View>
      )}
      { orderPlaced && (
        <View style={{ ...styles.cartEmptyContainer, justifyContent: "space-around" }}>
          <CheckMark />
          <Text style={{ ...styles.cartEmptyText, marginBottom: 10 }}>
            Your order has been placed!!
          </Text>
        </View>
      )}
      <Modal 
        visible={showModal} 
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
      > 
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={{ ...styles.canvasType, marginTop: 0 }}>Confrim Order</Text>
            <Pressable style={styles.modalCloseButton} onPress={() => setShowModal(!showModal)}>
              <AntDesign name="closecircleo" size={24} color="white" />
            </Pressable>
          </View>
          <Divider />
          <ScrollView>
            {cart.items.map((item, index) => {
              const Component = typeof item.name === "string" && item.name in componentsMap 
                ? componentsMap[item.name as keyof typeof componentsMap] 
                : null;
              return Component ? 
                <View key={index}>
                  <Component item={item} modalOpen={true}/> 
                  <Divider/>
                </View>
                : null;
            })}
            <View style={styles.contactsContainer}>
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>First Name :</Text>
                <Text style={styles.contactInput}>{firstName}</Text>
              </View>
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>Last Name :</Text>
                <Text style={styles.contactInput}>{lastName}</Text>
              </View>
              <View style={styles.contactContainer}>
                <Text style={styles.contactText}>Phone No. : </Text>
                <Text style={styles.contactInput}>{phoneNumber}</Text>
              </View>
            </View>
            <Divider />
            <View style={{ ...styles.totalContainer, marginBottom: 30 }}>
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
            </View>
            <Divider/>
            <TouchableOpacity style={styles.orderButton} onPress={() => placeOrder()}>
              <Text style={styles.addressButtonText}>Pay</Text> 
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <View style={styles.container}>
        <ScrollView>
          {cart.items.map((item, index) => {
            const Component = typeof item.name === "string" && item.name in componentsMap 
              ? componentsMap[item.name as keyof typeof componentsMap] 
              : null;
            return Component ? 
              <View key={index}>
                <Component item={item} modalOpen={false}/> 
                <Divider width={1}/>
              </View>
              : null;
          })}
          <TouchableOpacity style={styles.deliveryButton} onPress={() => {
            getLocationPersmission();
            setDelivery(!delivery);
          }}>
            { delivery ? 
              <MaterialIcons name="radio-button-on" size={24} color="#ffffff" />
              :
              <MaterialIcons name="radio-button-off" size={24} color="#ffffff" />
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
          <Divider width={1}/>
          <View style={styles.contactsContainer}>
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>First Name :</Text>
              <TextInput
                style={styles.contactInput}
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>Last Name :</Text>
              <TextInput
                style={styles.contactInput}
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View style={styles.contactContainer}>
              <Text style={styles.contactText}>Phone No. : </Text>
              <TextInput
                style={styles.contactInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="0977123456"
              />
            </View>
          </View>
          <Divider width={1}/>
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
          </View>
          <Divider width={1}/>
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
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

export default Cart;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    paddingBottom: Platform.OS === "ios" ? 65 : 55,
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
    zIndex: 2,
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
    textAlign: "center",
  },
  modal: {
    flex: 1,
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
    height: 60,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  deliveryButtonText : {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  mapContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: 400,
  },
  addressButton : {
    flexDirection: "row",
    backgroundColor: "#45454566",
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
    color: "#ffffff",
  },
  contactsContainer: {
    flexDirection: "column",
    margin: 10,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
  },
  contactText : {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#ffffff",
    width: 120,
  },
  contactInput : {
    flex: 1,
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    color: "#ffffff",
    backgroundColor: "#45454566",  
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  totalContainer: {
    flexDirection: "column",
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 10,
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
    marginVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 90,
  },
});