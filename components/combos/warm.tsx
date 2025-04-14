import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, usePathname } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "app/CartReducer";
import { RootState } from "app/store";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Details from "components/details";

const PRICE: number = 420;
const SIZE: string = "4 X A4";
const NAME : string = "WARM";
const TYPE: string = "COMBO";

const WIDTH = Dimensions.get("window").width;
const Warm: React.FC = () => {
 
  //Define state variables
  const [image_1, setImage_1] = useState<string | null>(null);
  const [image_2, setImage_2] = useState<string | null>(null);
  const [image_3, setImage_3] = useState<string | null>(null);
  const [image_4, setImage_4] = useState<string | null>(null);
  const [noImage, setNoImage] = useState<boolean>(false);

  const pathName = usePathname();

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
  
  const cartItems = useSelector((state : RootState) => state.cart.items);
  const dispatch = useDispatch();

  //Define a function that adds an item to the cart
  const addItemToCart = () => {
    if(!image_1 || !image_2 || !image_3 || !image_4) {
      setNoImage(true);
      return;
    }
    const item = {
      id: SIZE,
      name: NAME,
      price: PRICE,
      size: SIZE,
      imageUrls: [image_1,image_2, image_3, image_4],
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
      imageUrls: [image_1,image_2, image_3, image_4],
      quantity: 1,
      totalPrice: PRICE,
      type: TYPE,
    };
    dispatch(cartActions.removeFromCart(item));
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.canvasType}>4 PIECE WARM</Text>
        <View style={styles.imagesContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={image_1 ? { uri: image_1 } : { uri : "https://picsum.photos/200/300" }} 
              style={styles.image} 
            />
            {
              pathName.includes("upload") && (
                <TouchableOpacity 
                  style={styles.cameraIcon} 
                  onPress={async () => setImage_1(await pickImage())}
                >
                  <MaskedView
                    maskElement={(
                      <View
                        style={[
                          StyleSheet.absoluteFill, 
                          { borderWidth : 3, borderRadius: 8 }]}
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
                  <MaterialCommunityIcons name="camera-plus-outline" size={18} color="white" />
                </TouchableOpacity>
              )
            }
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={image_2 ? { uri: image_2 } : { uri : "https://picsum.photos/200/300" }} 
              style={styles.image} 
            />
            {
              pathName.includes("upload") && (
                <TouchableOpacity 
                  style={styles.cameraIcon} 
                  onPress={async () => setImage_2(await pickImage())}
                >
                  <MaskedView
                    maskElement={(
                      <View
                        style={[
                          StyleSheet.absoluteFill, 
                          { borderWidth : 3, borderRadius: 8 }]}
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
                  <MaterialCommunityIcons name="camera-plus-outline" size={18} color="white" />
                </TouchableOpacity>
              )
            }
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={image_3 ? { uri: image_3 } : { uri : "https://picsum.photos/200/300" }} 
              style={styles.image}
            />
            {
              pathName.includes("upload") && (
                <TouchableOpacity 
                  style={styles.cameraIcon} 
                  onPress={async () => setImage_3(await pickImage())}
                >
                  <MaskedView
                    maskElement={(
                      <View
                        style={[ StyleSheet.absoluteFill, 
                          { borderWidth : 3, borderRadius: 8 }]}
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
                  <MaterialCommunityIcons name="camera-plus-outline" size={18} color="white" />
                </TouchableOpacity>
              )
            }
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={image_4 ? { uri: image_4 } : { uri : "https://picsum.photos/200/300" }} 
              style={styles.image} 
            />
            {
              pathName.includes("upload") && (
                <TouchableOpacity 
                  style={styles.cameraIcon} 
                  onPress={async () => setImage_4(await pickImage())}
                >
                  <MaskedView
                    maskElement={(
                      <View
                        style={[
                          StyleSheet.absoluteFill, 
                          { borderWidth : 3, borderRadius: 8 }]}
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
                  <MaterialCommunityIcons name="camera-plus-outline" size={18} color="white" />
                </TouchableOpacity>
              )
            }
          </View>
        </View>
        <Details price={PRICE} size={SIZE}/>
        <View style={styles.warningContainer}> 
          { 
            noImage && (
              <Text style={styles.warning}>
                Please upload all images before adding an item to cart
              </Text>
            )
          }
        </View>
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
          (pathName.includes("products") || pathName.includes("combo")) && 
          <Link href={{ pathname: "/uploadCombo", params: { name: NAME } }} asChild >
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>SELECT</Text>
            </TouchableOpacity>
          </Link>
        }
      </View>   
    </View>
  );
};

export default Warm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    height: 500,
    width: "95%",
    padding: 3,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  canvasType: {
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    marginBottom: 10,
    color: "#ffffff",
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  imageContainer : {
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 2.5,
    elevation: 5,
  },
  image: {
    width: 0.21 * WIDTH,
    height: 154,
  },
  cameraIcon: {
    position: "absolute",
    padding: 5,
    bottom: 5,
    right: 4,
  },
  warningContainer: {
    minHeight: 20, 
    justifyContent: "center", 
    alignItems: "center"
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
