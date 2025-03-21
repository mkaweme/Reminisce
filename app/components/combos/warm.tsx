import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, useLocalSearchParams, usePathname } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "app/CartReducer";
import { RootState } from "app/store";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const PRICE: number = 420;
const SIZE: string = "4 X A4";
const NAME : string = "WARM";
const Warm: React.FC = () => {
  
  const { size, price , type, name } = useLocalSearchParams();
  const itemPrice = Number(price);
    
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
      id: size,
      name: name,
      price: itemPrice,
      size: size,
      imageUrls: [image_1,image_2, image_3],
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
      imageUrls: [image_1,image_2, image_3],
      quantity: 1,
      totalPrice: itemPrice,
      type: type
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
              style={{ width: 95, height: 154 }} 
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
              )
            }
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={image_2 ? { uri: image_2 } : { uri : "https://picsum.photos/200/300" }} 
              style={{ width: 95, height: 154, }} 
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
              )
            }
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={image_3 ? { uri: image_3 } : { uri : "https://picsum.photos/200/300" }} 
              style={{ width: 95, height: 154 }}
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
              )
            }
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={image_4 ? { uri: image_4 } : { uri : "https://picsum.photos/200/300" }} 
              style={{ width: 95, height: 154 }} 
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
              )
            }
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.canvasDimensions}>{SIZE}</Text>
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
          noImage ? (
            <Text style={styles.warning}>
              Please upload all images before adding an item to cart
            </Text>
          ) : null
        }
        {
          pathName.includes("upload") ? (
            cartItems.some((value) => value.size == size ) ? (
              <TouchableOpacity style={styles.orderButton} onPress={removeItemFromCart}>
                <Text style={styles.orderButtonText}>REMOVE FROM CART</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.orderButton} onPress={addItemToCart}>
                <Text style={styles.orderButtonText}>ADD TO CART</Text>
              </TouchableOpacity>
            )
          ) : (
            <Link href={{
              pathname: "/uploadCombo",
              params: {
                name: NAME,
              }
            }}
            asChild
            >
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>SELECT</Text>
              </TouchableOpacity>
            </Link>
          )
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
    height: 490,
    width: "96%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
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
    flexDirection: "row",
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
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
