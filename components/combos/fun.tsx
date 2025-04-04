import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, usePathname } from "expo-router";
import { RootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { cartActions } from "app/CartReducer";

const PRICE: number = 750;
const SIZE: string = "2 X A3 | 4 X A4";
const NAME : string = "FUN";
const TYPE: string = "COMBO";

const WIDTH = Dimensions.get("window").width;

const Fun: React.FC = () => {

  //Define state variables
  const [image_1, setImage_1] = useState<string | null>(null);
  const [image_2, setImage_2] = useState<string | null>(null);
  const [image_3, setImage_3] = useState<string | null>(null);
  const [image_4, setImage_4] = useState<string | null>(null);
  const [image_5, setImage_5] = useState<string | null>(null);
  const [image_6, setImage_6] = useState<string | null>(null);
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
    
    //If an image was selected and the process wasn't cancelled
    if (!result.canceled) {
      setNoImage(false);
      return result.assets[0].uri;
    } else return null;
  };

  //Define variables for holding cart items and the dispatch function
  const cartItems: CanvasItem[] = useSelector((state : RootState) => state.cart.items);
  const dispatch = useDispatch();

  //Define a function that adds an item to the cart
  const addItemToCart = () => {
    if(!image_1 || !image_2 || !image_3 || !image_4 || !image_5 || !image_6) {
      setNoImage(true);
      return;
    }
    const item = {
      id: SIZE,
      name: NAME,
      price: PRICE,
      size: SIZE,
      imageUrls: [image_1,image_2, image_3, image_4, image_5, image_6],
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
      imageUrls: [image_1,image_2, image_3, image_4, image_5, image_6],
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
        setImage_1(item.imageUrls[0]);
        setImage_2(item.imageUrls[1]);
        setImage_3(item.imageUrls[2]);
        setImage_4(item.imageUrls[3]);
        setImage_5(item.imageUrls[4]);
        setImage_6(item.imageUrls[5]);
      }
    }
  };
      
  useEffect(() => {
    checkCart();
  }, []);
    
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.canvasType}>6 PIECE FUN</Text>
        <View style={styles.imagesContainer}>
          <View style={styles.columnImagesContainer}>
            <View style={styles.imageContainer}>
              <Image 
                source={image_1 ? { uri: image_1 } : { uri : "https://picsum.photos/200/300" }} 
                style={styles.image_1} 
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
                            { borderWidth : 3, borderRadius: 8 }]
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
                    <MaterialCommunityIcons 
                      name="camera-plus-outline" 
                      size={18} 
                      color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
            <View style={styles.imageContainer}>
              <Image 
                source={image_2 ? { uri: image_2 } : { uri : "https://picsum.photos/200/300" }} 
                style={styles.image_1} 
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
                            { borderWidth : 3, borderRadius: 8 }]
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
                    <MaterialCommunityIcons 
                      name="camera-plus-outline" 
                      size={18} 
                      color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          <View style={styles.columnImagesContainer}>
            <View style={styles.imageContainer}>
              <Image 
                source={image_3 ? { uri: image_3 } : { uri : "https://picsum.photos/200/300" }} 
                style={styles.image_2} resizeMode="cover"
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
                          style={[
                            StyleSheet.absoluteFill, 
                            { borderWidth : 3, borderRadius: 9 }]
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
                    <MaterialCommunityIcons 
                      name="camera-plus-outline" 
                      size={20} 
                      color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
            <View style={styles.imageContainer}>
              <Image 
                source={image_4 ? { uri: image_4 } : { uri : "https://picsum.photos/200/300" }} 
                style={styles.image_2} resizeMode="cover"
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
                            { borderWidth : 3, borderRadius: 9 }]
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
                    <MaterialCommunityIcons 
                      name="camera-plus-outline" 
                      size={20} 
                      color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          <View style={styles.columnImagesContainer}>
            <View style={styles.imageContainer}>
              <Image 
                source={image_5 ? { uri: image_5 } : { uri : "https://picsum.photos/200/300" }} 
                style={styles.image_1}
              />
              {
                pathName.includes("upload") && (
                  <TouchableOpacity 
                    style={styles.cameraIcon} 
                    onPress={async () => setImage_5(await pickImage())}
                  >
                    <MaskedView
                      maskElement={(
                        <View
                          style={[
                            StyleSheet.absoluteFill, 
                            { borderWidth : 3, borderRadius: 8 }]
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
                    <MaterialCommunityIcons 
                      name="camera-plus-outline" 
                      size={18} 
                      color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
            <View style={styles.imageContainer}>
              <Image 
                source={image_6 ? { uri: image_6 } : { uri : "https://picsum.photos/200/300" }} 
                style={styles.image_1} 
              />
              {
                pathName.includes("upload") && (
                  <TouchableOpacity 
                    style={styles.cameraIcon} 
                    onPress={async () => setImage_6(await pickImage())}
                  >
                    <MaskedView
                      maskElement={(
                        <View
                          style={
                            [StyleSheet.absoluteFill, { borderWidth : 3, borderRadius: 8 }]
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
                    <MaterialCommunityIcons 
                      name="camera-plus-outline" 
                      size={18} 
                      color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
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
          noImage && (
            <Text style={styles.warning}>
              Please upload all images before adding an item to cart
            </Text>
          )
        }
        {
          pathName.includes("upload") && !isNavigating && (
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
          pathName.includes("combos") && (
            <Link 
              href={{ pathname: "/uploadCombo",params: { name: NAME } }}
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

export default Fun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    minHeight: 490,
    width: "96%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  canvasType: {
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    marginTop: 30,
    color: "#ffffff",
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    columnGap: 5,
    marginTop: 30,
    height: 260,
    justifyContent: "center",
  },
  columnImagesContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
    justifyContent: "space-around",
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
  image_1: {
    width: 0.23 * WIDTH, 
    height: 120, 
  },
  image_2: {
    width: 0.45 * WIDTH, 
    height: 120, 
   
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
