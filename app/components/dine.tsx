import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

const Dine = () => {

  //Define state variables
  const [image, setImage] = useState<string | null> (null);

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
      <Text style={styles.splitCanvasType}>3 PIECE DINE</Text>
      <View style={styles.splitContainer}>
        <View style={styles.previewContainer}>
          <View style={styles.previewWindow}>
            <Image source={image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} style={styles.image_1} />
          </View>
        </View>
        <View style={styles.previewContainer}>
          <View style={styles.previewWindow}>
            <Image source={image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} style={styles.image_2} />
          </View>
        </View>
        <View style={styles.previewContainer}>
          <View style={styles.previewWindow}>
            <Image source={ image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} style={styles.image_3} />
          </View>
        </View>
        <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage(await pickImage())}>
          <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.splitCanvasDimensions}>3 : 70CM X 30CM</Text>
        <View style={styles.priceTab}>
          <Text style={styles.priceTabText}>K650</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#707684",
  },
  splitCanvasType: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
    marginTop: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 30,
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
    shadowColor: "#000",
    shadowOffset: { 
      width: 5, 
      height: 5 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
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
    borderColor: "#ffffff66",
    borderWidth: 3,
    borderRadius: 25,
    padding: 5,
    bottom: 0,
    right: 0,
  },
  details: {
    width: 275,
    marginTop: 20,
    backgroundColor: "#ffffff66",
    alignContent: "center",
    alignItems: "center",
  },
  splitCanvasDimensions: {
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
  },
});