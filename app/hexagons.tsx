import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import HexagonImage from "./components/hexagonImage";

const Hexagons = () => {
  //Define state variables
  const [image_1, setImage_1] = useState<string | null>(null);
  const [image_2, setImage_2] = useState<string | null>(null);
  const [image_3, setImage_3] = useState<string | null>(null);

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
              <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.canvasDimensions}>3 X A4</Text>
        <View style={styles.priceTab}>
          <Text style={styles.priceTabText}>K650</Text>
        </View>
      </View>
      <Link href="/order" asChild>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>ORDER</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Hexagons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e0b0ff",
  },
  canvasType: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
    margin: 15,
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
    borderColor: "#ffffff66",
    borderWidth: 3,
    borderRadius: 25,
    padding: 5,
    bottom: 100,
    right: 0,
  },
  cameraIcon_2: {
    position: "absolute",
    borderColor: "#ffffff66",
    borderWidth: 3,
    borderRadius: 25,
    padding: 5,
    bottom: 0,
    right: 0,
  },
  horizonalContainer: {
    display: "flex",
    flexDirection: "row",
    top: -50,
  },
  details: {
    width: 275,
    marginTop: 15,
    backgroundColor: "#ffffff66",
    alignContent: "center",
    alignItems: "center",
  },
  canvasDimensions: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
  },
  priceTab: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#09759a",
  },
  priceTabText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
  },
  orderButton : {
    width: 150,
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#09759a",
  },
  orderButtonText : {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  }, 
});
