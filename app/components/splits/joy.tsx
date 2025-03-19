import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useFonts } from "expo-font";
import BebasNeueRegular from "../../../assets/fonts/BebasNeue-Regular.ttf";
import { Link, usePathname } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

const PRICE: number = 780;
const SIZE: string = "70CM X 120CM";

const Joy = () => {

  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": BebasNeueRegular,
  });
  
  if (!fontsLoaded) {
    return null;
  }

  //Define state variables
  const [image, setImage] = useState<string | null> (null);

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
      return result.assets[0].uri;
    } else return null;
  };
    
  return (
    <View style={styles.container}>
      <View style={styles.section}>
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
        <Text style={styles.canvasType}>4 PIECE JOY</Text>
        <View style={styles.splitContainer}>
          <View style={styles.previewContainer_1}> 
            <View style={styles.previewWindow}>
              <Image 
                source={image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} 
                style={styles.image_1} 
              />
            </View>
          </View>
          <View style={styles.previewContainer_2}>
            <View style={styles.previewWindow}>
              <Image
                source={image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} 
                style={styles.image_2} 
              />
            </View>
          </View>
          <View style={styles.previewContainer_1}>
            <View style={{ width: 75, height: 140, overflow: "hidden" }}>
              <Image 
                source={ image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} 
                style={styles.image_3} 
              />
            </View>
          </View>
          <View style={styles.previewContainer_2}>
            <View style={styles.previewWindow}>
              <Image 
                source={ image ? { uri: image } : { uri: "https://picsum.photos/200/300" }}
                style={styles.image_4} 
              />
            </View>
          </View>
          {
            pathName.includes("upload") && (
              <TouchableOpacity 
                style={styles.cameraIcon} 
                onPress={async () => setImage(await pickImage())}
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
        <Link href={{
          pathname: "/portraitSizes",
          params: {
            image: image,
            canvasType: "3 PIECE DINE",
            size: SIZE,
            price: PRICE,
            type: "split"
          }
        }}
        asChild
        >
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>SELECT</Text>
          </TouchableOpacity>
        </Link>
      </View>  
    </View>
  );
};

export default Joy;

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
    width: 305,
    height: 180,
    alignContent: "center",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { 
      width: 5, 
      height: 5 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  previewContainer_1: {
    position: "relative",
    top: 25,
  },
  previewContainer_2: {
    position: "relative",
  },
  previewWindow: {
    width: 75,
    height: 140,
    overflow: "hidden",
  },
  image_1: {
    width: 300,
    height: 170,
    top: -25,
  },
  image_2: {
    width: 300,
    height: 170,
    position: "absolute",
    left: -75,
    top: 0,
  },
  image_3: {
    width: 300,
    height: 170,
    position: "absolute",
    left: -150,
    top: -25,
  },
  image_4: {
    width: 300,
    height: 170,
    position: "absolute",
    left: -225,
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
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
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
  orderButton : {
    backgroundColor: "#ffffff",
    width: 150,
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  orderButtonText : {
    color: "#09759a",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
  },
});