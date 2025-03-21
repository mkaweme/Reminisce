import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./CartReducer";
import { RootState } from "./store";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const UploadPortrait = () => {

  const { size, price , aspectRatio: aspectRatioParam, type } = useLocalSearchParams();
  const itemPrice = Number(price);

  //Define state variables
  const aspectRatio = Array.isArray(aspectRatioParam) ? 
    parseFloat(aspectRatioParam[0]) : parseFloat(aspectRatioParam);
  const [image_1, setImage_1] = useState<string | null> (null);
  const [image_2, setImage_2] = useState<string | null> (null); 
  const [noImage, setNoImage] = useState<boolean>(false);

  const cartItems = useSelector((state : RootState) => state.cart.items);
  const dispatch = useDispatch();

  //Define a function that adds an item to the cart
  const addItemToCart = () => {
    if(!image_1) {
      setNoImage(true);
      return;
    } else if (size === "A4 X 2" && !image_2) {
      setNoImage(true);
      return;
    }
    const item = {
      id: size,
      name: size,
      price: itemPrice,
      size: size,
      imageUrls: [image_1, image_2],
      quantity: 1,
      totalPrice: itemPrice,
      type: type
    };
    dispatch(cartActions.addToCart(item));
  };
  //Define a function that aremoves an item from the cart
  const removeItemFromCart = () => {
    const item = {
      id: size,
      name: size,
      price: itemPrice,
      size: size,
      imageUrls: [image_1, image_2],
      quantity: 1,
      totalPrice: itemPrice,
      type: type
    };
    dispatch(cartActions.removeFromCart(item));
  };
  
  /**
   * Prompts the user to select an image from the device's librarY.
   * The aspect ratio is set to 1: aspectRatio, which is passed to search param.
   * If the user selects an image, the URI of the image is returned; 
   * otherwise, null is returned.
   */
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, aspectRatio],
      quality: 1,
    });

    //If an images was selected and the process wasn't cancelled
    if (!result.canceled) {
      setNoImage(false);
      return result.assets[0].uri;
    } else return null;

  };

  return (
    <LinearGradient 
      colors={["#2dcc9f", "#62004d"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradientContainer}   
    >
      <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
        <View style={styles.section}>
          <View style={styles.detailsContainer}>
            <Text style={styles.canvasType}>{size}</Text>
            <Text style={styles.canvasType}> : </Text>
            <LinearGradient 
              colors={["#34ffc6", "#d900aa" ]} 
              start={{ x:0, y: 0 }} 
              end={{ x: 1, y: 1 }} 
              style={styles.priceContainer}   
            >
              <Text style={styles.price}>K{price}</Text>
            </LinearGradient>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={image_1 ? { uri: image_1 } : { uri: "https://picsum.photos/200/300" }} 
              style={styles.portrait} 
            />
            <TouchableOpacity 
              style={styles.cameraIcon} 
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
          {
            size == "A4 X 2" ? (
              <View style={styles.imageContainer}>
                <Image 
                  source={
                    image_2 ? { uri: image_2 } : { uri: "https://picsum.photos/200/300" }
                  } 
                  style={styles.portrait} 
                />
                <TouchableOpacity 
                  style={styles.cameraIcon} 
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
        
            ) : null
          }
          { 
            noImage ? (
              <Text style={styles.warning}>
                Please upload an image before adding an item to cart
              </Text>
            ) : null
          }
          {
            cartItems.some((value) => value.size == size ) ? (
              <TouchableOpacity style={styles.orderButton} onPress={removeItemFromCart}>
                <Text style={styles.orderButtonText}>REMOVE FROM CART</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.orderButton} onPress={addItemToCart}>
                <Text style={styles.orderButtonText}>ADD TO CART</Text>
              </TouchableOpacity>
            )
          } 
        </View>  
      </ScrollView>
    </LinearGradient>
  );
};

export default UploadPortrait;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsText: {
    color: "#fff",
    fontFamily: "BebasNeue-Regular",
    fontSize: 30,
  },
  section : {
    justifyContent: "space-between",
    alignItems: "center",
  },
  canvasType: {
    position: "relative",
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    marginTop: 20,
    color: "#ffffff"
  },
  priceContainer: {
    fontSize: 40,
    width: 100,
    height: 50,
    fontFamily: "BebasNeue-Regular",
    marginTop: 20,
    color: "#ffffff",
    alignItems: "center",
    borderRadius:5,
  },
  price: {
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
    fontSize: 40,
  },
  portrait: {
    width: 200,
    height: 300,
    margin: 20,
  },
  fullImageContainer: {
    height: 550,
    width: "100%",
    alignItems: "center",
  },
  imageContainer : {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  cameraIcon: {
    position: "absolute",
    padding: 5,
    bottom: 5,
    right: 4,
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
