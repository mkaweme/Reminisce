import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { Link, usePathname } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { RootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "app/CartReducer";

const PRICE: number = 650;
const SIZE: string = "3 : 70CM X 90CM";
const NAME : string = "DINE";
const TYPE : string = "SPLIT";

const Dine: React.FC = () => {

  //Define state variables
  const [image, setImage] = useState<string | null> (null);
  const [noImage, setNoImage] = useState<boolean>(false);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  //define a variable for the path name
  const pathName: string = usePathname();

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
  
  const cartItems: CanvasItem[] = useSelector((state : RootState) => state.cart.items);
  const dispatch = useDispatch();

  //Define a function that adds an item to the cart
  const addItemToCart = () => {
    if(!image) {
      setNoImage(true);
      return;
    }
    const item = {
      id: SIZE,
      name: NAME,
      price: PRICE,
      size: SIZE,
      imageUrls: [image],
      quantity: 1,
      totalPrice: PRICE,
      type: TYPE,
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
      imageUrls: [image],
      quantity: 1,
      totalPrice: PRICE,
      type: TYPE,
    };
    dispatch(cartActions.removeFromCart(item));
  };
  
  //Define a function that checks if this item is in the cart, 
  // if it is, set the image to the imageurl from the item in the cart
  const checkCart = () => {
    if (cartItems.length > 0) {
      const item = cartItems.find((item) => item.name === NAME);
      if (item) {
        setImage(item.imageUrls[0]);
      }
    }
  };
  
  useEffect(() => {
    checkCart();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.canvasType}>3 PIECE {NAME}</Text>
        <View style={styles.splitContainer}>
          <View style={styles.previewContainer}>
            <View style={styles.previewWindow}>
              <Image 
                source={image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} 
                style={styles.image_1} 
              />
            </View>
          </View>
          <View style={styles.previewContainer}>
            <View style={styles.previewWindow}>
              <Image 
                source={image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} 
                style={styles.image_2} 
              />
            </View>
          </View>
          <View style={styles.previewContainer}>
            <View style={styles.previewWindow}>
              <Image 
                source={ image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} 
                style={styles.image_3} 
              />
            </View>
          </View>
          {
            pathName.includes("upload") && !isNavigating && (
              <TouchableOpacity 
                style={styles.cameraIcon} 
                onPress={async () => setImage(await pickImage())}
              >
                <MaskedView
                  maskElement={(
                    <View
                      style={[
                        StyleSheet.absoluteFill, 
                        { borderWidth : 3, borderRadius: 10 }]
                      }
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
            )}
        </View>
        <View style={styles.details}>
          <Text style={styles.splitCanvasDimensions}>{SIZE}</Text>
          <LinearGradient 
            colors={["#34ffc6", "#d900aa" ]} 
            start={{ x:0, y: 0 }} 
            end={{ x: 1, y: 1 }} 
            style={styles.priceContainer}   
          >
            <Text style={styles.price}>K{PRICE}</Text>
          </LinearGradient>
        </View>
        { 
          noImage && (
            <Text style={styles.warning}>
              Please upload an image before adding an item to cart
            </Text>
          )
        }
        {
          pathName.includes("upload") && (
            cartItems.some((value) => value.size == SIZE ) ? (
              <TouchableOpacity style={styles.orderButton} onPress={removeItemFromCart}>
                <Text style={styles.orderButtonText}>REMOVE FROM CART</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.orderButton} onPress={addItemToCart}>
                <Text style={styles.orderButtonText}>ADD TO CART</Text>
              </TouchableOpacity>
            )
          ) 
        }
        {
          pathName.includes("cart") && (
            cartItems.some((value) => value.size == SIZE ) && (
              <TouchableOpacity style={styles.orderButton} onPress={removeItemFromCart}>
                <Text style={styles.orderButtonText}>REMOVE FROM CART</Text>
              </TouchableOpacity>
            )
          ) 
        }
        {  
          pathName.includes("splits") && (
            <Link 
              href={{ pathname: "/uploadSplit", params: { name: NAME } }}
              asChild
            >
              <TouchableOpacity 
                style={styles.orderButton} 
                onPress={() => setIsNavigating(true)}
              >
                <Text style={styles.orderButtonText}>SELECT</Text>
              </TouchableOpacity>
            </Link>
          )
        }   
      </View>  
    </View>
  );
};

export default Dine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section : {
    height: 490,
    width: "95%",
    padding: 3,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  canvasType: {
    position: "relative",
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    marginTop: 20,
    color: "#ffffff"
  },
  fullImageContainer: {
    height: 500,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  splitContainer: {
    flexDirection: "row",
    width: 275,
    marginTop: 15,
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    // backgroundColor: "#ffffff",
    // borderRadius: 5,
  },
  previewContainer: {
    position: "relative",
  },
  previewWindow: {
    width: 90,
    height: 210,
    overflow: "hidden",
  },
  image_1: {
    width: 270,
    height: 210,
  },
  image_2: {
    width: 270,
    height: 210,
    position: "absolute",
    left: -90,
  },
  image_3: {
    width: 270,
    height: 210,
    position: "absolute",
    left: -180,
  },
  cameraIcon: {
    position: "absolute",
    padding: 5,
    bottom: 5,
    right: 4,
  },
  details: {
    width: 300,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  splitCanvasDimensions: {
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
    backgroundColor: "#ffffff",
    width: 250,
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  orderButtonText : {
    color: "#1f1f1f",
    fontSize: 18,
    fontWeight: "500",
  },
});