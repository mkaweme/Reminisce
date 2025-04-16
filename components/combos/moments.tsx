import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, usePathname } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { cartActions } from "app/CartReducer";
import Details from "components/details";

const PRICE: number = 650;
const SIZE: string = "1: 59CM X 35CM | 4: 20CM X 40CM";
const NAME : string = "MOMENTS";
const TYPE : string = "COMBO";

type ComponentProps = {
  item: CanvasItem;
  modalOpen?: boolean;
};

const WIDTH = Dimensions.get("window").width;
const Moments: React.FC<ComponentProps> = ({ modalOpen }) => {
      
  //Define state variables
  const [image_1, setImage_1] = useState<string | null>(null);
  const [image_2, setImage_2] = useState<string | null>(null);
  const [image_3, setImage_3] = useState<string | null>(null);
  const [image_4, setImage_4] = useState<string | null>(null);
  const [image_5, setImage_5] = useState<string | null>(null);
  const [noImage, setNoImage] = useState<boolean>(false);

  const pathName = usePathname();
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
  
  const cartItems = useSelector((state : RootState) => state.cart.items);
  const dispatch = useDispatch();

  //Define a function that adds an item to the cart
  const addItemToCart = () => {
    if(!image_1 || !image_2 || !image_3 || !image_4 || !image_5) {
      setNoImage(true);
      return;
    }
    const item = {
      iid: SIZE,
      name: NAME,
      price: PRICE,
      size: SIZE,
      imageUrls: [image_1,image_2, image_3, image_4, image_5],
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
      imageUrls: [image_1,image_2, image_3, image_4, image_5],
      quantity: 1,
      totalPrice: PRICE,
      type: TYPE,
    };
    dispatch(cartActions.removeFromCart(item));
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.canvasType}>5 PIECE MOMENTS</Text>
        <View style={styles.imagesContainer}>
          <View style={{ ...styles.columnImagesContainer, alignSelf: "flex-end" }}>
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
                      size={16} color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
            <View style={styles.imageContainer}>
              <Image 
                source={
                  image_2 ? { uri: image_2 } : { uri : "https://picsum.photos/200/300" }
                } 
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
                      size={16} color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          <View style={{ ...styles.columnImagesContainer, alignSelf: "center" }}>
            <View style={styles.imageContainer}>
              <Image 
                source={
                  image_3 ? { uri: image_3 } : { uri : "https://picsum.photos/200/300" }
                } 
                style={styles.image_2} 
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
                      size={18} color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
          <View style={styles.columnImagesContainer}>
            <View style={styles.imageContainer}>
              <Image 
                source={
                  image_4 ? { uri: image_4 } : { uri : "https://picsum.photos/200/300" }
                } 
                style={styles.image_1} 
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
                      size={16} color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
            <View style={styles.imageContainer}>
              <Image 
                source={
                  image_5 ? { uri: image_5 } : { uri : "https://picsum.photos/200/300" }
                } 
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
                      size={18} color="white" 
                    />
                  </TouchableOpacity>
                )
              }
            </View>
          </View>
        </View>
        <Details price={PRICE} size={SIZE}/>
        { 
          noImage && (
            <Text style={styles.warning}>
              Please upload all images before adding an item to cart
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
          !modalOpen && pathName.includes("cart") && (
            cartItems.some((value) => value.size == SIZE ) && (
              <TouchableOpacity style={styles.orderButton} onPress={removeItemFromCart}>
                <Text style={styles.orderButtonText}>REMOVE FROM CART</Text>
              </TouchableOpacity>
            )
          )
        }
        { 
          pathName.includes("combos") && (
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

export default Moments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    minHeight: 500,
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
    flexDirection: "row",
    columnGap: 10,
    marginTop: 5,
    height: 250,
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
  },
  columnImagesContainer: {
    flexDirection: "column",
    rowGap: 15,
  },
  imageContainer : {
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  image_1: {
    width: 0.30 * WIDTH, 
    height: 60, 
  },
  image_2: {
    width: 0.27 * WIDTH, 
    height: 180, 
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
