import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import HexagonImage from "../../../components/hexagonImage";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../CartReducer";
import Details from "components/details";

const PRICE:number = 680;
const NAME: string = "HEXAGONS";
const SIZE: string = "3: 30cm X 30CM";
const Hexagons = () => {
  
  //Define state variables
  const [image_1, setImage_1] = useState<string | null>(null);
  const [image_2, setImage_2] = useState<string | null>(null);
  const [image_3, setImage_3] = useState<string | null>(null);
  const [noImage, setNoImage] = useState<boolean>(false);

  const cartItems = useSelector((state : RootState) => state.cart.items);
  const dispatch = useDispatch();
  //Define a function for selecting an image from the device
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    
    //If an images was selected and the process wasn't cancelled
    if (!result.canceled) {
      setNoImage(false);
      return result.assets[0].uri;
    } else return null;
  };

  //Define a function that adds an item to the cart
  const addItemToCart = () => {
    if(!image_1 || !image_2 || !image_3) {
      setNoImage(true);
      return;
    }
    const item = {
      id: SIZE,
      name: NAME,
      price: PRICE,
      size: SIZE,
      imageUrls: [image_1, image_2, image_3],
      quantity: 1,
      totalPrice: PRICE,
      type: NAME,
    };
    dispatch(cartActions.addToCart(item));
  };

  //Define a function that aremoves an item from the cart
  const removeItemFromCart = () => {
    const item = {
      id: SIZE,
      name: NAME,
      price: PRICE,
      size: SIZE,
      imageUrls: [image_1, image_2, image_3],
      quantity: 1,
      totalPrice: PRICE,
      type: NAME,
    };
    dispatch(cartActions.removeFromCart(item));
  };

  return (
    <LinearGradient 
      colors={["#525252", "#b6b6b8"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradientContainer}   
    >
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
        <Text style={styles.canvasType}>Hexagons</Text>
        <View style={styles.imagesContainer}>
          <View style={styles.imageContainer}>
            <HexagonImage 
              source={image_1 ? { uri: image_1 } : { uri : "https://picsum.photos/200/300" }} 
              size={150} 
            />
            <TouchableOpacity 
              style={styles.cameraIcon_1} 
              onPress={async () => setImage_1(await pickImage())}
            >
              <MaskedView
                maskElement={(
                  <View
                    style={[
                      StyleSheet.absoluteFill, 
                      { borderWidth : 3, borderRadius: 10 }]}
                  />
                )}
                style={[StyleSheet.absoluteFill]}
              >
                <LinearGradient
                  colors={["#d900aa", "#34ffc6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[StyleSheet.absoluteFill]}
                />
              </MaskedView>
              <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.horizonalContainer}>
            <View style={styles.imageContainer}>
              <HexagonImage 
                source={image_2 ? { uri: image_2 } : { uri : "https://picsum.photos/200/300" }} 
                size={150} 
              />
              <TouchableOpacity 
                style={styles.cameraIcon_2} 
                onPress={async () => setImage_2(await pickImage())}
              >
                <MaskedView
                  maskElement={(
                    <View
                      style={[
                        StyleSheet.absoluteFill, 
                        { borderWidth : 3, borderRadius: 10 }]}
                    />
                  )}
                  style={[StyleSheet.absoluteFill]}
                >
                  <LinearGradient
                    colors={["#d900aa", "#34ffc6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[StyleSheet.absoluteFill]}
                  />
                </MaskedView>
                <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <HexagonImage 
                source={image_3 ? { uri: image_3 } : { uri : "https://picsum.photos/200/300" }} 
                size={150} 
              />
              <TouchableOpacity 
                style={styles.cameraIcon_2} 
                onPress={async () => setImage_3(await pickImage())}
              >
                <MaskedView
                  maskElement={(
                    <View
                      style={[
                        StyleSheet.absoluteFill, 
                        { borderWidth : 3, borderRadius: 10 }]}
                    />
                  )}
                  style={[StyleSheet.absoluteFill]}
                >
                  <LinearGradient
                    colors={["#d900aa", "#34ffc6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[StyleSheet.absoluteFill]}
                  />
                </MaskedView>
                <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Details price={PRICE} size={SIZE}/>
        { 
          noImage ? (
            <Text style={styles.warning}>
              Please upload all images before adding an item to cart
            </Text>
          ) : null
        }
        {
          cartItems.some((value) => value.size == SIZE ) ? (
            <TouchableOpacity style={styles.orderButton} onPress={removeItemFromCart}>
              <Text style={styles.orderButtonText}>REMOVE FROM CART</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.orderButton} onPress={addItemToCart}>
              <Text style={styles.orderButtonText}>ADD TO CART</Text>
            </TouchableOpacity>
          )
        } 
      </ScrollView>
    </LinearGradient>
  );
};

export default Hexagons;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
  },
  canvasType: {
    position: "relative",
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    marginTop: 20,
    color: "#ffffff"
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer : {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon_1: {
    position: "absolute",
    padding: 5,
    bottom: 100,
    right: 0,
  },
  horizonalContainer: {
    display: "flex",
    flexDirection: "row",
    top: -38,
  },
  cameraIcon_2: {
    position: "absolute",
    padding: 5,
    bottom: 0,
    right: 0,
  },
  details: {
    width: 300,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  canvasDimensions: {
    fontSize: 30,
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
  },
  priceContainer: {
    fontSize: 40,
    width: 100,
    height: 50,
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
    alignItems: "center",
    borderRadius:5,
  },
  price: {
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
    fontSize: 40,
  },
  warning : {
    color: "white",
  },
  orderButton : {
    width: 250,
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  orderButtonText : {
    color: "#1f1f1f",
    fontSize: 18,
    fontWeight: "500",
  },
});
